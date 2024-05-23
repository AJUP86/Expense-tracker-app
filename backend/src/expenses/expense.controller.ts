// src/expense/expense.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from '../database/entities/expense.entity';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create an expense' })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created.',
    type: Expense,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'Return all expenses.',
    type: [Expense],
  })
  findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the expense.',
    type: Expense,
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: number): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an expense' })
  @ApiResponse({
    status: 200,
    description: 'The expense has been successfully updated.',
    type: Expense,
  })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  update(
    @Param('id') id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.update(id, updateExpenseDto);
  }
}

