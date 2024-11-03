// src/budget/budget.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../database/entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { Role } from 'src/database/enums/roles.enum';
import { SharedBudgetService } from 'src/shared-budget/shared-budget.service';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly sharedBudgetService: SharedBudgetService,
  ) {}

  async create(
    createBudgetDto: CreateBudgetDto,
    userId: number,
  ): Promise<Budget> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
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

    await this.sharedBudgetService.createSharedBudget({
      user_id: user.user_id,
      budget_id: savedBudget.budget_id,
      role: Role.GroupOwner,
    });

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
    return this.budgetRepository.save(budget);
  }

  async remove(id: number): Promise<void> {
    const budget = await this.findOne(id);
    await this.budgetRepository.remove(budget);
    await this.sharedBudgetService.removeSharedBudgetsForBudget(id);
  }
}
