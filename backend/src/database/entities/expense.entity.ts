// src/database/entities/expense.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Budget } from './budget.entity';
import { PaymentMethodType } from '../enums/payment-method.enum';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  expense_id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @Column({
    type: 'enum',
    enum: PaymentMethodType,
  })
  paymentMethod: PaymentMethodType;
}
