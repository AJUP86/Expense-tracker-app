import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedBudgetService } from './shared-budget.service';
import { SharedBudgetController } from './shared-budget.controller';
import { SharedBudget } from 'src/database/entities/shared-budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SharedBudget])],
  providers: [SharedBudgetService],
  controllers: [SharedBudgetController],
  exports: [SharedBudgetService],
})
export class SharedBudgetModule {}

