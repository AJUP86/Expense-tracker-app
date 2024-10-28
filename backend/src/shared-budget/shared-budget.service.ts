import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedBudget } from 'src/database/entities/shared-budget.entity';
import { CreateSharedBudgetDto } from './dto/create-shared-budget.dto';
import { UpdateSharedBudgetDto } from './dto/update-shared-budget.dto';
import { Role } from 'src/database/enums/roles.enum';

@Injectable()
export class SharedBudgetService {
  constructor(
    @InjectRepository(SharedBudget)
    private readonly sharedBudgetRepository: Repository<SharedBudget>,
  ) {}

  async createSharedBudget(
    createSharedBudgetDto: CreateSharedBudgetDto,
  ): Promise<SharedBudget> {
    const sharedBudget = this.sharedBudgetRepository.create(
      createSharedBudgetDto,
    );
    return this.sharedBudgetRepository.save(sharedBudget);
  }

  async updateSharedBudget(
    id: number,
    updateSharedBudgetDto: UpdateSharedBudgetDto,
  ): Promise<SharedBudget> {
    await this.sharedBudgetRepository.update(id, updateSharedBudgetDto);
    return this.sharedBudgetRepository.findOne({
      where: { shared_budget_id: id },
    });
  }

  async findSharedBudget(
    userId: number,
    budgetId: number,
  ): Promise<SharedBudget | undefined> {
    return this.sharedBudgetRepository.findOne({
      where: {
        user: { user_id: userId },
        budget: { budget_id: budgetId },
      },
      relations: ['user', 'budget'],
    });
  }

  async findSharedBudgetsForUser(userId: number): Promise<SharedBudget[]> {
    return this.sharedBudgetRepository.find({
      where: { user: { user_id: userId } },
      relations: ['user', 'budget'],
    });
  }

  async findOne(sharedBudgetId: number): Promise<SharedBudget | undefined> {
    return this.sharedBudgetRepository.findOne({
      where: { shared_budget_id: sharedBudgetId },
      relations: ['user', 'budget'],
    });
  }

  async removeSharedBudgetsForBudget(budgetId: number): Promise<void> {
    await this.sharedBudgetRepository.delete({
      budget: { budget_id: budgetId },
    });
  }

  async assignRole(
    userId: number,
    budgetId: number,
    role: Role,
  ): Promise<void> {
    const sharedBudget = await this.sharedBudgetRepository.findOne({
      where: { user: { user_id: userId }, budget: { budget_id: budgetId } },
    });

    if (sharedBudget) {
      sharedBudget.role = role;
      await this.sharedBudgetRepository.save(sharedBudget);
    } else {
      await this.createSharedBudget({
        user_id: userId,
        budget_id: budgetId,
        role,
      });
    }
  }
}
