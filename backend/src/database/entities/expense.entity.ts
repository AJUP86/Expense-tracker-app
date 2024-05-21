// src/database/entities/expense.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Category } from './category.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity()
@Index(['date'])
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
  category: Category;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.expenses)
  paymentMethod: PaymentMethod;
}
