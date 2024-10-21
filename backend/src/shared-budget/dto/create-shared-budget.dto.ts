import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/database/enums/roles.enum';

export class CreateSharedBudgetDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user being added to the shared budget',
  })
  readonly user_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the budget' })
  readonly budget_id: number;

  @ApiProperty({
    example: Role.GroupOwner,
    enum: Role,
    description: 'The role assigned to the user in the budget',
  })
  readonly role: Role;
}
