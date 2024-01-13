import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import UserRepository from '@models/repositories/User.repository';
import { JwtStrategy } from '@shared/strategy/jwt.strategy';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@models/entities/User.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { EEnvKey } from '@constants/env.constant';
import { JWT_EXPIRE_IN } from '@constants/auth.constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: JWT_EXPIRE_IN,
        },
        secret: configService.get<string>(EEnvKey.TOKEN_AUTH_KEY),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/upload',
      }),
    }),
  ],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
