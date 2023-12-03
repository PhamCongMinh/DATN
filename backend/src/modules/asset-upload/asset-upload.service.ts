import { Injectable } from '@nestjs/common';
import { readFile, rm } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { User } from '@models/entities';
import UploadedAssetRepository from '@models/repositories/UploadAsset.repository';

@Injectable()
export class AssetUploadService {
  private s3_prefix: string;

  constructor(
    private configService: ConfigService,
    private uploadedAssetRepository: UploadedAssetRepository,
  ) {
    // this.s3_prefix = this.configService.get<string>(EEnvKey.S3_PREFIX);
  }
  async create(file: Express.Multer.File, user_id: string) {
    const filePath = `${file.destination}/${file.filename}`;

    return await this.uploadedAssetRepository.create({
      asset_url: filePath,
      file_type: 'pdf',
      user_id: user_id,
    });

    // await rm(filePath);

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   console.log('FilePath', filePath);
    //   console.log('Prepare upload file to s3');
    //   console.log('Start ReadFile');
    //   await readFile(filePath);
    //   console.log('ReadFile successfully');
    //
    //   const uploadedFile = await this.awsService.uploadS3(
    //     await readFile(filePath),
    //     file.filename,
    //   );
    //   console.log('UploadedFile successfully');
    //
    //   // Replace domain to prefix
    //   const newAssetUrl = `${this.s3_prefix}/${uploadedFile.key}`;
    //   console.log('NewAssetUrl', newAssetUrl);
    //   const saveFiled = await queryRunner.manager.save(UploadedAsset, {
    //     asset_url: newAssetUrl,
    //     file_type: file.mimetype,
    //     is_used: false,
    //     s3_key: uploadedFile.key,
    //     user,
    //   } as DeepPartial<UploadedAsset>);
    //   console.log('SaveFiled', saveFiled);
    //   await queryRunner.commitTransaction();
    //   return saveFiled;
    // } catch (error) {
    //   console.log(error);
    //   await queryRunner.rollbackTransaction();
    //   throw error;
    // } finally {
    //   await queryRunner.release();
    //   await rm(filePath);
    // }
  }
}
