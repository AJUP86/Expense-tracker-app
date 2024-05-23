import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from '../database/entities/budget.entity';
import { User } from '../database/entities/user.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { Category } from 'src/database/entities/category.entity';
import { Expense } from 'src/database/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, User, Category, Expense])],
  providers: [BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
