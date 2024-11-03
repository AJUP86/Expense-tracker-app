import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateBudgetDto {
  @ApiProperty({
    example: 'Household Budget',
    description: 'Name of the budget',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Start date of the budget',
  })
  @IsDateString()
  readonly start_date: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'End date of the budget',
  })
  @IsDateString()
  readonly end_date: string;
}
