import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Budget } from './budget.entity';
import { User } from './user.entity';
import { Role } from '../enums/roles.enum';

@Entity()
export class SharedBudget {
  @PrimaryGeneratedColumn()
  shared_budget_id: number;

  @ManyToOne(() => Budget, (budget) => budget.sharedBudgets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @ManyToOne(() => User, (user) => user.sharedBudgets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
