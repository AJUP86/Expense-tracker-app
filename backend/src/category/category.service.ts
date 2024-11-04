// src/category/category.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Budget } from '../database/entities/budget.entity';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    this.logger.log('Creating a new category...');

    const budget = await this.budgetRepository.findOne({
      where: { budget_id: createCategoryDto.budgetId },
      relations: ['user', 'invitations'],
    });
    if (!budget) {
      this.logger.warn(
        `Budget with ID ${createCategoryDto.budgetId} not found`,
      );

      throw new NotFoundException('Budget not found');
    }
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      budget,
      remaining_amount: createCategoryDto.allocated_amount,
    });
    const savedCategory = await this.categoryRepository.save(category);

    this.logger.log(
      `Category created successfully with ID ${savedCategory.category_id}`,
    );

    const updatedCategory = await this.categoryRepository.findOne({
      where: { category_id: category.category_id },
      relations: ['budget', 'budget.user', 'budget.invitations'],
    });

    if (updatedCategory) {
      this.logger.log(
        `Refetching updated budget with ID ${createCategoryDto.budgetId}`,
      );
      updatedCategory.budget = await this.budgetRepository.findOne({
        where: { budget_id: createCategoryDto.budgetId },
      });
    }
    return updatedCategory;
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
