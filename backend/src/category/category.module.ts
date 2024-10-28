// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../database/entities/category.entity';
import { Budget } from '../database/entities/budget.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SharedBudgetModule } from 'src/shared-budget/shared-budget.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Budget]), SharedBudgetModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
