import { Expense } from './entities/expense.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Budget } from './entities/budget.entity';
import { Category } from './entities/category.entity';
import { Invitation } from './entities/invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Budget, Category, Expense, Invitation]),
  ],
})
export class DatabaseModule {}
