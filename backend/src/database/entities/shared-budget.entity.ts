import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Budget } from './budget.entity';
import { User } from './user.entity';
import { Role } from '../enums/roles.enum';

@Entity()
export class SharedBudget {
  @PrimaryGeneratedColumn()
  shared_budget_id: number;

  @ManyToOne(() => Budget, (budget) => budget.sharedBudgets)
  budget: Budget;

  @ManyToOne(() => User, (user) => user.sharedBudgets)
  user: User;

  @Column({ type: 'enum', enum: Role })
  role: Role;
}
