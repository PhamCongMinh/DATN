import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EAuthGuard } from '@constants/auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(EAuthGuard.JWT) {}
