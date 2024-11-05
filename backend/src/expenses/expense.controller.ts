// src/expense/expense.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaymentMethodType } from '../database/enums/payment-method.enum';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from '../database/entities/expense.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('expenses')
@Controller('expenses')
@UseGuards(JwtAuthGuard)
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
  @ApiOperation({ summary: 'Get all expenses with optional pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns all expenses.',
    type: [Expense],
  })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Expense[]> {
    return this.expenseService.findAll(page, limit);
  }

  @Get('payment-methods')
  @ApiOperation({ summary: 'Get available payment methods' })
  @ApiResponse({
    status: 200,
    description: 'Returns all payment methods',
    type: [String],
  })
  getPaymentMethods(): string[] {
    return Object.values(PaymentMethodType);
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
