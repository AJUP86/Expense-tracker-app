// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedBudgetModule } from 'src/shared-budget/shared-budget.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedBudgetModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

