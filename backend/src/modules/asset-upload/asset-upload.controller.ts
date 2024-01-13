import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { AssetUploadService } from './asset-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/guards/auth.guard';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole, User } from '@models/entities';
import { UploadedAsset } from '@models/entities/UploadedAsset.entity';
import { CreateAssetUploadDto } from '@modules/asset-upload/dto/create-asset-upload.dto';

@Controller('asset-upload')
@ApiTags('Uploads')
export class AssetUploadController {
  constructor(private readonly assetUploadService: AssetUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
      // limits: {
      //   fileSize: 20242880, // 20mb
      // },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
    description: 'upload file',
  })
  @ApiResponse({ type: UploadedAsset })
  @UseAuth([EUserRole.TEACHER, EUserRole.STUDENT, EUserRole.USER])
  create(
    @UploadedFile()
    data: Express.Multer.File,
    @Req() req,
  ) {
    return this.assetUploadService.create(data, req.user._id);
  }

  @Delete('/:id')
  // @UseAuth([EUserRole.TEACHER, EUserRole.STUDENT, EUserRole.USER])
  delete(@Param('id') id: string, @Req() req) {
    return this.assetUploadService.delete(
      id,

      // req.user._id
    );
  }
}
