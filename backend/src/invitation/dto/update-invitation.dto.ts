import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInvitationDto {
  @ApiPropertyOptional({
    example: 'accepted',
    description: 'Status of the invitation',
  })
  readonly status?: string;
}
