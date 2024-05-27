import { ApiProperty } from '@nestjs/swagger';

export class CreateInvitationDto {
  @ApiProperty({ example: 1, description: 'Sender ID' })
  readonly senderId: number;

  @ApiProperty({ example: 2, description: 'Receiver ID' })
  readonly receiverId: number;

  @ApiProperty({ example: 1, description: 'Budget ID' })
  readonly budgetId: number;

  @ApiProperty({ example: 'pending', description: 'Status of the invitation' })
  readonly status: string;
}
