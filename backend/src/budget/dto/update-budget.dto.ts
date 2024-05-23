import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBudgetDto {
  @ApiPropertyOptional({
    example: 'Household Budget',
    description: 'Name of the budget',
  })
  readonly name?: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
    description: 'Start date of the budget',
  })
  readonly startDate?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31',
    description: 'End date of the budget',
  })
  readonly endDate?: Date;
}
