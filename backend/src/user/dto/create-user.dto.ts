import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  readonly username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  readonly email: string;

  @ApiProperty({ example: 'google', description: 'OAuth provider of the user' })
  readonly oauth_provider: string;

  @ApiProperty({ example: '1234567890', description: 'OAuth ID of the user' })
  readonly oauth_id: string;
}
