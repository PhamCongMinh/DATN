import { Injectable } from '@nestjs/common';
import { readFile, rm } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { User } from '@models/entities';
import UploadedAssetRepository from '@models/repositories/UploadAsset.repository';
import { AzureService } from '@modules/asset-upload/azure.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AssetUploadService {
  constructor(
    private configService: ConfigService,
    private uploadedAssetRepository: UploadedAssetRepository,
    private azureService: AzureService,
  ) {}
  async create(file: Express.Multer.File, user_id: string) {
    const filePath = `${file.destination}/${file.filename}`;

    try {
      const extension = file.originalname.split('.').pop();
      const file_name = uuidv4() + '.' + extension;

      const fileUrl = await this.azureService.uploadFile(
        await readFile(filePath),
        file_name,
      );

      return await this.uploadedAssetRepository.create({
        asset_url: fileUrl,
        file_type: extension,
        user_id: user_id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await rm(filePath);
    }
  }

  async delete(
    id: string,
    // user_id: string
  ) {
    const asset = await this.uploadedAssetRepository.findById(id);

    // if (!asset || asset.length === 0 || asset[0].user_id !== user_id)
    //   throw new Error('Asset not found');

    await this.azureService.deleteFile(asset[0].asset_url, 'datn');

    return await this.uploadedAssetRepository.delete(id);
  }
}
