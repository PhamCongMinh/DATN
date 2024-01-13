import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EEnvKey } from '@constants/env.constant';
import { Unauthorized } from '@shared/exception';
import { ErrorConstant } from '@constants/error.constant';
import { EAuthGuard } from '@constants/auth.constant';
import UserRepository from '@models/repositories/User.repository';
import { ObjectID } from 'mongodb';

const configService = new ConfigService();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, EAuthGuard.JWT) {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(EEnvKey.TOKEN_AUTH_KEY),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.userDocumentModel
      .findOne({
        _id: payload._id,
      })
      .exec();

    if (!user)
      throw new Unauthorized({
        message: ErrorConstant.AUTHORIZATION.YOU_ARE_UNAUTHORIZED,
      });
    return user;
  }
}
