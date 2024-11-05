// src/expense/expense.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../database/entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Category } from '../database/entities/category.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private notificationService: NotificationService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: createExpenseDto.categoryId },
      relations: ['budget'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      category,
    });

    return this.expenseRepository.save(expense);
  }

  async findAll(page = 1, limit = 10): Promise<Expense[]> {
    const skip = (page - 1) * limit;
    return this.expenseRepository.find({
      relations: ['category', 'category.budget', 'category.budget.user'],
      skip,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { expense_id: id },
      relations: ['category', 'category.budget', 'category.budget.user'],
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { expense_id: id },
      relations: [
        'category',
        'category.budget',
        'category.budget.user',
        'category.budget.invitations.receiver',
      ],
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (updateExpenseDto.categoryId) {
      const newCategory = await this.categoryRepository.findOne({
        where: { category_id: updateExpenseDto.categoryId },
        relations: ['budget'],
      });
      if (!newCategory) {
        throw new NotFoundException('New category not found');
      }
      expense.category = newCategory;
    }

    Object.assign(expense, updateExpenseDto);
    const updatedExpense = await this.expenseRepository.save(expense);

    // Collect emails of all users in the budget
    const budget = expense.category.budget;
    const budgetUsersEmails = budget.invitations.map(
      (invitation) => invitation.receiver.email,
    );
    budgetUsersEmails.push(budget.user.email);

    // Send notification
    await this.notificationService.sendExpenseUpdateNotification(
      budgetUsersEmails,
      `Expense ${updatedExpense.description} was updated.`,
    );

    return updatedExpense;
  }

  async remove(id: number): Promise<void> {
    const expense = await this.expenseRepository.findOne({
      where: { expense_id: id },
    });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    // Throw an error to indicate deletions are not allowed
    throw new Error(
      `Deletions are not allowed for expended amount ${expense.amount}, on date ${expense.date}.`,
    );
  }
}
