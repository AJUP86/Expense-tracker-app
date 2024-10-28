// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Budget } from '../database/entities/budget.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const budget = await this.budgetRepository.findOne({
      where: { budget_id: createCategoryDto.budgetId },
      relations: ['user', 'invitations'],
    });
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      budget,
      remaining_amount: createCategoryDto.allocated_amount,
    });
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['budget', 'budget.user', 'budget.invitations'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['budget', 'budget.user', 'budget.invitations'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.preload({
      category_id: id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
