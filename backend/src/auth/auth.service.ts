import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateOrCreateUser(profile: any): Promise<any> {
    const { emails, id, name } = profile;
    const email = emails[0].value;

    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      const createUserDto: CreateUserDto = {
        username: `${name.givenName} ${name.familyName}`,
        email,
        oauth_provider: 'google',
        oauth_id: id,
      };
      user = await this.userService.create(createUserDto);
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
