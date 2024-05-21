// src/expense/dto/create-expense.dto.ts
import { PaymentMethodType } from '../../database/enums/payment-method.enum';

export class CreateExpenseDto {
  readonly description: string;
  readonly amount: number;
  readonly date: Date;
  readonly categoryId: number;
  readonly paymentMethod: PaymentMethodType;
}
