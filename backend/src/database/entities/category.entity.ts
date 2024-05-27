// src/database/entities/category.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { Budget } from './budget.entity';
import { Expense } from './expense.entity';

@Entity()
@Index(['name'])
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  @Column('decimal', { default: 0 })
  allocated_amount: number;

  @Column('decimal', { default: 0 })
  remaining_amount: number;

  @ManyToOne(() => Budget, (budget) => budget.categories)
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
