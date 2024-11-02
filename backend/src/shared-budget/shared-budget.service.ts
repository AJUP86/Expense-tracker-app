import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedBudget } from 'src/database/entities/shared-budget.entity';
import { CreateSharedBudgetDto } from './dto/create-shared-budget.dto';
import { UpdateSharedBudgetDto } from './dto/update-shared-budget.dto';
import { Role } from 'src/database/enums/roles.enum';
import { User } from 'src/database/entities/user.entity';
import { Budget } from 'src/database/entities/budget.entity';

@Injectable()
export class SharedBudgetService {
  constructor(
    @InjectRepository(SharedBudget)
    private readonly sharedBudgetRepository: Repository<SharedBudget>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject UserRepository
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  async createSharedBudget(
    createSharedBudgetDto: CreateSharedBudgetDto,
  ): Promise<SharedBudget> {
    const { user_id, budget_id, role } = createSharedBudgetDto;
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    const budget = await this.budgetRepository.findOne({
      where: { budget_id },
    });
    if (!budget) {
      throw new NotFoundException(`Budget with id ${budget_id} not found`);
    }

    const sharedBudget = this.sharedBudgetRepository.create({
      user,
      budget,
      role,
    });
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
