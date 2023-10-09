import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { RentOutService } from '@modules/rent-out/rent-out.service';
import { CreateRentalNewsDto } from '@modules/rent-out/dto/request/createRentalNewsDto';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { UpdateRentalNewsDto } from '@modules/rent-out/dto/request/updateRentalNewsDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 } from 'uuid';
import { ManageSystemService } from '@modules/manage-system/manage-system.service';

@ApiTags('Manage System')
@Controller('manage-system')
export class ManageSystemController {
  constructor(
    private manageSystemService: ManageSystemService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ManageSystemController');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get('/')
  async getSystemInformation() {
    return this.manageSystemService.getSystemInformation();
  }
}
