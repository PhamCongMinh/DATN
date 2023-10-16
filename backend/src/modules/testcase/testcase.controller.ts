import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { TestcaseService } from '@modules/testcase/testcase.service';

@ApiTags('RentOut')
@Controller('rent-out')
export class TestcaseController {
  constructor(
    private testcaseService: TestcaseService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('TestcaseController');
  }

  // @UseAuth(Object.values(EUserRole))
  // @Post('/')
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
  // async createRentalNews(
  //   @Req() req,
  //   @Body() createRentalNews: CreateRentalNewsDto,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1024000 }),
  //         // new FileTypeValidator({ fileType: 'jpeg' }),
  //       ],
  //     }),
  //   )
  //   image: Express.Multer.File,
  // ) {
  //   createRentalNews['imageUrl'] = [image.path];
  //   return this.rentOutService.createRentalNews(req.user.id, createRentalNews);
  // }
  //
  // @UseAuth(Object.values(EUserRole))
  // @Put(':id')
  // // @ApiConsumes('multipart/form-data')
  // // @UseInterceptors(
  // //   FileInterceptor('image', {
  // //     storage: diskStorage({
  // //       destination: 'src/upload',
  // //       filename: (req, file, cb) => {
  // //         const filename: string = v4();
  // //         const extension: string = path.parse(file.originalname).ext;
  // //         cb(null, `${filename}${extension}`);
  // //       },
  // //     }),
  // //   }),
  // // )
  // async updateRentalNews(
  //   @Param('id') id: string,
  //   @Body() updateRentalNews: UpdateRentalNewsDto,
  //   // @UploadedFile(
  //   //   new ParseFilePipe({
  //   //     validators: [new MaxFileSizeValidator({ maxSize: 1024000 })],
  //   //   }),
  //   // )
  //   // image: Express.Multer.File,
  // ) {
  //   // if (image) updateRentalNews.imageUrl = [image.path];
  //   return this.rentOutService.updateRentalNews(id, updateRentalNews);
  // }
  //
  // @UseAuth(Object.values(EUserRole))
  // @Delete(':id')
  // async deleteRentalNews(@Param('id') id: string) {
  //   return this.rentOutService.deleteRentalNews(id);
  // }
  //
  // @UseAuth(Object.values(EUserRole))
  // @Get('/')
  // async getRentalNewsByOwner(@Req() req) {
  //   return this.rentOutService.getAllRentalNews(req.user.id);
  // }
  //
  // // @UseGuards(JwtAuthGuard)
  // // @ApiBearerAuth('jwt')
  // // @Post('upload/image')
  // // @UseInterceptors(
  // //   FileInterceptor('image', {
  // //     storage: diskStorage({
  // //       destination: 'src/upload',
  // //       filename: (req, file, cb) => {
  // //         const filename: string = uuid();
  // //         // const filename: string =  path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
  // //         const extension: string = path.parse(file.originalname).ext;
  // //
  // //         cb(null, `${filename}${extension}`);
  // //       },
  // //     }),
  // //   }),
  // // )
  // // async uploadImage(
  // //   @UploadedFile(
  // //     new ParseFilePipe({
  // //       validators: [new FileTypeValidator({ fileType: 'jpeg' })],
  // //     }),
  // //   )
  // //   image: Express.Multer.File,
  // // ) {
  // //   return { imagePath: image.path };
  // // }
}
