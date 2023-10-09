import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { RentService } from '@modules/rent/rent.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RentalNewsDocument } from '@models/entities/RentalNews';
import { FilterDto } from '@modules/rent/dto/request/filter.dto';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { UpdateProfileDto } from '@modules/auth/dto/updateProfile.dto';
import { v4 } from 'uuid';
import { ProofRentedDto } from '@modules/rent/dto/request/ProofRented.dto';

@ApiTags('Rent')
@Controller('rent')
export class RentController {
  constructor(
    private rentService: RentService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutController');
  }

  @Get('/')
  async filterRentalNews(@Query() filterData: FilterDto) {
    return this.rentService.filterRentalNews(filterData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('proof-rented')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'proofImage' }], {
      storage: diskStorage({
        destination: 'src/upload',
        filename: (req, file, cb) => {
          const filename: string = v4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async updateProfile(
    @Req() req,
    @Body() proofRentedDto: ProofRentedDto,
    @UploadedFiles() files: any,
  ) {
    proofRentedDto['proofImage'] = files.proofImage[0].path;
    return this.rentService.proofOfRented(req.user.id, proofRentedDto);
  }
}
