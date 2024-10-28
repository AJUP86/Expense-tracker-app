import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({ example: 'Groceries', description: 'Name of the category' })
  readonly name: string;

  @ApiProperty({
    example: 200,
    description: 'Allocated amount for the category',
  })
  readonly allocated_amount: number;

  @ApiProperty({ example: 1, description: 'ID of the associated budget' })
  readonly budgetId: number;
}
