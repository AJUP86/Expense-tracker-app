// src/shared-budget/dto/update-shared-budget.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/database/enums/roles.enum';

export class UpdateSharedBudgetDto {
  @ApiPropertyOptional({
    example: Role.GroupCoOwner,
    enum: Role,
    description: 'The updated role for the user in the shared budget',
  })
  readonly role?: Role;
}
