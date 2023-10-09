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
import {
  PrivateInformation,
  PrivateInformationSchema,
} from '@models/entities/PrivateInformation.entity';
import PrivateInformationRepository from '@models/repositories/PrivateInformation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: PrivateInformation.name,
        schema: PrivateInformationSchema,
      },
    ]),
    JwtModule,
    PassportModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/upload',
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    PrivateInformationRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
