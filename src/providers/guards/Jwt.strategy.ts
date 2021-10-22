import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthGuard } from './auth.guard';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authGuard: AuthGuard) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN,
    });
  }

  async validate(payload: any) {
    // const user = this.authGuard.validateUser(payload.login);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return payload;
  }
}
