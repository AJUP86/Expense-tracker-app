import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'johndoe',
    description: 'Username of the user',
  })
  readonly username?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  readonly email?: string;

  @ApiPropertyOptional({
    example: 'google',
    description: 'OAuth provider of the user',
  })
  readonly oauth_provider?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'OAuth ID of the user',
  })
  readonly oauth_id?: string;
}
