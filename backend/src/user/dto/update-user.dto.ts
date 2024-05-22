import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  readonly lastName?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  readonly email?: string;
}
