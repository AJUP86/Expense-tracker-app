// src/expense/dto/create-expense.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType } from '../../database/enums/payment-method.enum';
import {
  isDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @ApiProperty({
    example: 'Grocery shopping',
    description: 'The description of the expense',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 100.5, description: 'The amount of the expense' })
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ example: new Date(), description: 'The date of the expense' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @ApiProperty({ example: 1, description: 'The ID of the category' })
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({ example: 1, description: 'The ID of the budget' })
  @IsNotEmpty()
  @IsNumber()
  readonly budgetId: number;

  @ApiProperty({
    example: PaymentMethodType.AMEX,
    description: 'The payment method used for the expense',
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethodType)
  readonly paymentMethod: PaymentMethodType;
}
