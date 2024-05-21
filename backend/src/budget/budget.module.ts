import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from '../database/entities/budget.entity';
import { User } from '../database/entities/user.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, User])],
  providers: [BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
