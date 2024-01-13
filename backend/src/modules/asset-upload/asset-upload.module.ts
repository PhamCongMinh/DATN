import { Module } from '@nestjs/common';
import { AssetUploadService } from './asset-upload.service';
import { AssetUploadController } from './asset-upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import {
  UploadedAsset,
  UploadedAssetSchema,
} from '@models/entities/UploadedAsset.entity';
import UploadedAssetRepository from '@models/repositories/UploadAsset.repository';
import { User, UserSchema } from '@models/entities';
import UserRepository from '@models/repositories/User.repository';
import { AzureService } from '@modules/asset-upload/azure.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UploadedAsset.name,
        schema: UploadedAssetSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [AssetUploadController],
  providers: [
    AssetUploadService,
    UploadedAssetRepository,
    UserRepository,
    AzureService,
  ],
})
export class AssetUploadModule {}
