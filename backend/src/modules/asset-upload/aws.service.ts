// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { S3 } from 'aws-sdk';
//
// import { EEnvKey } from '@constants/env.constant';
// import { isString } from 'class-validator';
//
// const configService = new ConfigService();
// @Injectable()
// export class AwsService {
//   private s3: S3;
//   constructor(private configService: ConfigService) {
//     this.s3 = new S3({
//       accessKeyId: configService.get(EEnvKey.S3_ACCESS_KEY_ID),
//       secretAccessKey: configService.get(EEnvKey.S3_SECRET_ACCESS_KEY),
//       //region: configService.get(EEnvKey.S3_REGION),
//     });
//   }
//   async uploadS3(
//     file,
//     name,
//   ): Promise<{
//     ETag: string;
//     Location: string;
//     key: string;
//     Key: string;
//     Bucket: string;
//   }> {
//     const params = {
//       Bucket: configService.get(EEnvKey.S3_BUCKET),
//       Key: String(name),
//       Body: file,
//     };
//     return new Promise((resolve, reject) => {
//       this.s3.upload(params, (err, data) => {
//         if (err) {
//           reject(err.message);
//           return;
//         }
//         resolve(data);
//       });
//     });
//   }
//   async removeFromS3(key: string = null) {
//     if (!isString(key)) return true;
//     const params = {
//       Bucket: configService.get(EEnvKey.S3_BUCKET),
//       Key: key,
//     };
//     return new Promise((resolve, reject) => {
//       this.s3.deleteObject(params, (err, data) => {
//         if (err) {
//           return resolve(err);
//         }
//         return resolve(true);
//       });
//     });
//   }
// }
