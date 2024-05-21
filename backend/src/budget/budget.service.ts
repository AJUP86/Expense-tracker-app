// src/budget/budget.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../database/entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from '../database/entities/user.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      remaining_amount: createBudgetDto.total_amount,
    });
    return this.budgetRepository.save(budget);
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
  }
}
