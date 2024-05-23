import { ApiProperty } from '@nestjs/swagger';

export class CreateBudgetDto {
  @ApiProperty({
    example: 'Household Budget',
    description: 'Name of the budget',
  })
  readonly name: string;

  @ApiProperty({ example: 1000, description: 'Total value of the budget' })
  readonly total_amount: number;

  @ApiProperty({ example: new Date(), description: 'Start date of the budget' })
  readonly start_date: Date;

  @ApiProperty({ example: new Date(), description: 'End date of the budget' })
  readonly end_date: Date;

  @ApiProperty({ example: 1, description: 'Owner of the budget' })
  readonly userId: number;
}
