import { RolesGuard } from './../auth/roles.guard';
// src/budget/budget.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from '../database/entities/budget.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/database/enums/roles.enum';

@ApiTags('budgets')
@Controller('budgets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a budget' })
  @ApiResponse({
    status: 201,
    description: 'The budget has been successfully created.',
    type: Budget,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles(Role.GroupOwner)
  create(@Body() createBudgetDto: CreateBudgetDto): Promise<Budget> {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all budgets' })
  @ApiResponse({
    status: 200,
    description: 'Return all budgets.',
    type: [Budget],
  })
  findAll(): Promise<Budget[]> {
    return this.budgetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a budget by ID' })
  @ApiResponse({ status: 200, description: 'Return the budget.', type: Budget })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  findOne(@Param('id') id: number): Promise<Budget> {
    return this.budgetService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a budget' })
  @ApiResponse({
    status: 200,
    description: 'The budget has been successfully updated.',
    type: Budget,
  })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  @Roles(Role.GroupOwner, Role.GroupCoOwner)
  update(
    @Param('id') id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a budget' })
  @ApiResponse({
    status: 200,
    description: 'The budget has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Budget not found' })
  @Roles(Role.GroupOwner)
  remove(@Param('id') id: number): Promise<void> {
    return this.budgetService.remove(id);
  }
}
