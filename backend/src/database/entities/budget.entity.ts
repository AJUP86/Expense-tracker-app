// src/database/entities/budget.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Expense } from './expense.entity';
import { Invitation } from './invitation.entity';
import { SharedBudget } from './shared-budget.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  budget_id: number;

  @Column()
  name: string;

  @Column('decimal', { default: 0 })
  total_amount: number;

  @Column('decimal', { default: 0 })
  remaining_amount: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => User, (user) => user.budgets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.ownedBudgets)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Category, (category) => category.budget)
  categories: Category[];

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[];

  @OneToMany(() => Invitation, (invitation) => invitation.budget)
  invitations: Invitation[];

  @OneToMany(() => SharedBudget, (sharedBudget) => sharedBudget.budget)
  sharedBudgets: SharedBudget[]; // Tracks users and roles in this budget
}
