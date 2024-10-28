// src/expense/dto/create-expense.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType } from '../../database/enums/payment-method.enum';

export class UpdateExpenseDto {
  @ApiProperty({
    example: 'Grocery shopping',
    description: 'The description of the expense',
  })
  readonly description: string;

  @ApiProperty({ example: 100.5, description: 'The amount of the expense' })
  readonly amount: number;

  @ApiProperty({ example: new Date(), description: 'The date of the expense' })
  readonly date: Date;

  @ApiProperty({ example: 1, description: 'The ID of the category' })
  readonly categoryId: number;

  @ApiProperty({
    example: PaymentMethodType.AMEX,
    description: 'The payment method used for the expense',
  })
  readonly paymentMethod: PaymentMethodType;
}
