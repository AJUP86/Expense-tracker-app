// src/database/entities/payment-method.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  payment_method_id: number;

  @Column()
  type: string;

  @OneToMany(() => Expense, (expense) => expense.paymentMethod)
  expenses: Expense[];
}
