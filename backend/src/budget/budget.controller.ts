// src/budget/budget.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from '../database/entities/budget.entity';

@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto): Promise<Budget> {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  findAll(): Promise<Budget[]> {
    return this.budgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Budget> {
    return this.budgetService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.budgetService.remove(id);
  }
}
