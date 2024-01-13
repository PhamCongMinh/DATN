import { PartialType } from '@nestjs/swagger';
import { CreateAssetUploadDto } from './create-asset-upload.dto';

export class UpdateAssetUploadDto extends PartialType(CreateAssetUploadDto) {}
