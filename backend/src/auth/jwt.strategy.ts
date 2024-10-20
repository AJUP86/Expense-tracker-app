import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Ensure token is not expired
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get secret from .env
    });
  }

  async validate(payload: any) {
    // Attach the validated user data (e.g., userId) to the request object
    return { userId: payload.sub, email: payload.email };
  }
}
