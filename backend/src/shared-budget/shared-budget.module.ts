import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedBudgetService } from './shared-budget.service';
import { SharedBudgetController } from './shared-budget.controller';
import { SharedBudget } from 'src/database/entities/shared-budget.entity';
import { User } from 'src/database/entities/user.entity'; // Import User entity
import { Budget } from 'src/database/entities/budget.entity'; // Import Budget entity
@Module({
  imports: [TypeOrmModule.forFeature([SharedBudget, User, Budget])],
  providers: [SharedBudgetService],
  controllers: [SharedBudgetController],
  exports: [SharedBudgetService],
})
export class SharedBudgetModule {}
