// src/budget/budget.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../database/entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { Expense } from '../database/entities/expense.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const user = await this.userRepository.findOne({
      where: { user_id: createBudgetDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const budget = this.budgetRepository.create({
      ...createBudgetDto,
      user,
      owner: user,
      total_amount: 0, // initially zero, will be calculated from categories
      remaining_amount: 0, // initially zero, will be calculated from expenses
    });
    const savedBudget = await this.budgetRepository.save(budget);
    await this.calculateTotalAmount(savedBudget.budget_id);
    await this.calculateRemainingAmount(savedBudget.budget_id);
    return savedBudget;
  }

  findAll(): Promise<Budget[]> {
    return this.budgetRepository.find({
      relations: ['user', 'categories', 'owner'],
    });
  }

  async findOne(id: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { budget_id: id },
      relations: ['user', 'categories', 'owner'],
    });
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.preload({
      budget_id: id,
      ...updateBudgetDto,
    });
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    const savedBudget = await this.budgetRepository.save(budget);
    await this.calculateTotalAmount(savedBudget.budget_id);
    await this.calculateRemainingAmount(savedBudget.budget_id);
    return savedBudget;
  }

  async remove(id: number): Promise<void> {
    const budget = await this.findOne(id);
    await this.budgetRepository.remove(budget);
  }

  async calculateTotalAmount(budgetId: number): Promise<void> {
    const categories = await this.categoryRepository.find({
      where: { budget: { budget_id: budgetId } },
    });
    const totalAmount = categories.reduce(
      (sum, category) => sum + category.allocated_amount,
      0,
    );
    await this.budgetRepository.update(budgetId, { total_amount: totalAmount });
  }

  async calculateRemainingAmount(budgetId: number): Promise<void> {
    const categories = await this.categoryRepository.find({
      where: { budget: { budget_id: budgetId } },
      relations: ['expenses'],
    });
    const remainingAmount = categories.reduce((sum, category) => {
      const categoryExpenses = category.expenses.reduce(
        (categorySum, expense) => categorySum + expense.amount,
        0,
      );
      return sum + (category.allocated_amount - categoryExpenses);
    }, 0);
    await this.budgetRepository.update(budgetId, {
      remaining_amount: remainingAmount,
    });
  }
}
