import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthErrorMessage, saltBcrypt } from '@modules/auth/constants/index';
import { User, UserDocument } from '@models/entities/User.entity';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { BadRequestException, Exception } from '@shared/exception';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import UserRepository from '@models/repositories/User.repository';
import { EEnvKey } from '@constants/env.constant';
import { UpdateAccountDto } from '@modules/auth/dto/updateAccount.dto';
import { UpdateProfileDto } from '@modules/auth/dto/updateProfile.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('AuthService');
  }

  sign(data: any) {
    return this.jwtService.sign(data);
  }

  async createAccessToken(user: UserDocument) {
    console.log(user.toObject());
    const result = user.toObject();

    result['access_token'] = this.jwtService.sign(user.toObject());

    delete result.password;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findUserByEmail(loginDto.email);
    console.log(user);
    // Check user exist
    if (!user)
      throw new BadRequestException({ message: AuthErrorMessage.NoExist });

    if (await bcrypt.compare(loginDto.password, user.password)) {
      return await this.createAccessToken(user);
    }
    throw new BadRequestException({ message: AuthErrorMessage.InvalidUser });
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findUserByEmail(registerDto.email);

    if (user)
      throw new BadRequestException({ message: AuthErrorMessage.UserExist });

    registerDto.password = await bcrypt.hash(registerDto.password, saltBcrypt);

    return await this.userRepository.userDocumentModel.create(registerDto);
  }

  async updateAccount(id, data: UpdateAccountDto) {
    await this.userRepository.userDocumentModel.updateOne({ _id: id }, data);
    const test = await this.userRepository.userDocumentModel.findOne({
      _id: id,
    });
    return test;
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    return;
  }

  async checkUpdatedInfo(id: string) {
    return true;
  }
}
