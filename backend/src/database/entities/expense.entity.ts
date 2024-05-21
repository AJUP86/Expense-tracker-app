// src/database/entities/expense.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
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
  category: Category;

  @Column({
    type: 'enum',
    enum: PaymentMethodType,
  })
  paymentMethod: PaymentMethodType;
}
