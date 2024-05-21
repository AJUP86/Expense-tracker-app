// src/expense/dto/update-expense.dto.ts
import { PaymentMethodType } from '../../database/enums/payment-method.enum';

export class UpdateExpenseDto {
  readonly description?: string;
  readonly amount?: number;
  readonly date?: Date;
  readonly categoryId?: number;
  readonly paymentMethod?: PaymentMethodType;
}
