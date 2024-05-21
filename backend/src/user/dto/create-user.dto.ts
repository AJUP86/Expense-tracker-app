export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly oauth_provider: string;
  readonly oauth_id: string;
}
