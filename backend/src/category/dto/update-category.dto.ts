import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Groceries',
    description: 'Name of the category',
  })
  readonly name?: string;

  @ApiPropertyOptional({
    example: 200,
    description: 'Allocated value for the category',
  })
  readonly allocated_amount?: number;
}
