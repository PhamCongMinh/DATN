import { Controller } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { ContestService } from '@modules/contest/contest.service';

@ApiTags('Rent')
@Controller('rent')
export class ContestController {
  constructor(
    private contestService: ContestService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ContestController');
  }

  // @Get('/')
  // async filterRentalNews(@Query() filterData: FilterDto) {
  //   return this.rentService.filterRentalNews(filterData);
  // }
  //
  // @UseAuth(Object.values(EUserRole))
  // @Post('proof-rented')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: 'proofImage' }], {
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
  // async updateProfile(
  //   @Req() req,
  //   @Body() proofRentedDto: ProofRentedDto,
  //   @UploadedFiles() files: any,
  // ) {
  //   proofRentedDto['proofImage'] = files.proofImage[0].path;
  //   return this.rentService.proofOfRented(req.user.id, proofRentedDto);
  // }
}
