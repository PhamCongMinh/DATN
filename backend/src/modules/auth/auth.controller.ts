import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@modules/auth/auth.service';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { ApiAuthDescription } from '@modules/auth/constants/description-api';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { UpdateAccountDto } from '@modules/auth/dto/updateAccount.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 } from 'uuid';
import { UpdateProfileDto } from '@modules/auth/dto/updateProfile.dto';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities/User.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('AuthController');
  }

  @Post('register')
  @ApiOperation({ description: ApiAuthDescription.register })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ description: ApiAuthDescription.login })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Post('logout')
  @ApiOperation({ description: ApiAuthDescription.logout })
  logout() {
    return {
      message: 'success',
    };
  }

  @UseAuth(Object.values(EUserRole))
  @Post('update-account')
  @ApiOperation({ description: ApiAuthDescription.update })
  updateAccount(@Req() req, @Body() data: UpdateAccountDto) {
    console.log(req.user.id, data);
    return this.authService.updateAccount(req.user.id, data);
  }

  @UseAuth(Object.values(EUserRole))
  @Post('update-profile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'citizenIdImage' },
        { name: 'portraitImage' },
        { name: 'proofImage' },
      ],
      {
        storage: diskStorage({
          destination: 'src/upload',
          filename: (req, file, cb) => {
            const filename: string = v4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
          },
        }),
      },
    ),
  )
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFiles() files: any,
  ) {
    updateProfileDto['citizenIdImage'] = files.citizenIdImage[0].path;
    updateProfileDto['portraitImage'] = files.portraitImage[0].path;
    if (files?.proofImage[0])
      updateProfileDto['proofImage'] = files.proofImage[0].path;
    return this.authService.updateProfile(req.user.id, updateProfileDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('check-updated-information')
  async checkUpdatedInfo(@Req() req) {
    return this.authService.checkUpdatedInfo(req.user.id);
  }
}
