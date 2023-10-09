import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from '@constants/env.constant';
import { Unauthorized } from '@shared/exception';
import { ErrorConstant } from '@constants/error.constant';
import { EAuthGuard } from '@constants/auth.constant';

const configService = new ConfigService();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, EAuthGuard.JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(EEnvKey.TOKEN_AUTH_KEY),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
