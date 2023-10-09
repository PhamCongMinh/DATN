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

@ApiTags('RentOut')
@Controller('rent-out')
export class RentOutController {
  constructor(
    private rentOutService: RentOutService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutController');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
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
  async createRentalNews(
    @Req() req,
    @Body() createRentalNews: CreateRentalNewsDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024000 }),
          // new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    createRentalNews['imageUrl'] = [image.path];
    return this.rentOutService.createRentalNews(req.user.id, createRentalNews);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Put(':id')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: 'src/upload',
  //       filename: (req, file, cb) => {
  //         const filename: string = v4();
  //         const extension: string = path.parse(file.originalname).ext;
  //         cb(null, `${filename}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  async updateRentalNews(
    @Param('id') id: string,
    @Body() updateRentalNews: UpdateRentalNewsDto,
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [new MaxFileSizeValidator({ maxSize: 1024000 })],
    //   }),
    // )
    // image: Express.Multer.File,
  ) {
    // if (image) updateRentalNews.imageUrl = [image.path];
    return this.rentOutService.updateRentalNews(id, updateRentalNews);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Delete(':id')
  async deleteRentalNews(@Param('id') id: string) {
    return this.rentOutService.deleteRentalNews(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get('/')
  async getRentalNewsByOwner(@Req() req) {
    return this.rentOutService.getAllRentalNews(req.user.id);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('jwt')
  // @Post('upload/image')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: 'src/upload',
  //       filename: (req, file, cb) => {
  //         const filename: string = uuid();
  //         // const filename: string =  path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
  //         const extension: string = path.parse(file.originalname).ext;
  //
  //         cb(null, `${filename}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // async uploadImage(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: 'jpeg' })],
  //     }),
  //   )
  //   image: Express.Multer.File,
  // ) {
  //   return { imagePath: image.path };
  // }
}
