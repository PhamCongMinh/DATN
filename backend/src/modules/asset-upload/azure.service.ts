import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AzureService {
  private blobService: BlobServiceClient;
  private readonly container: string;
  private readonly azureConnection: string;

  constructor(private configService: ConfigService) {
    this.container = 'datn';
    this.azureConnection =
      'DefaultEndpointsProtocol=https;AccountName=datn;AccountKey=9eHF1ew2+CouVvFIvruhDE2vmMqEKMegwMaRdck6WXXKrC8RpJOyJF/44cCp3jDR9DSRwd26astM+AStfpfdrg==;EndpointSuffix=core.windows.net';
    // this.containerName = this.configService.get(EEnvKey.S3_ACCESS_KEY_ID)
    //key = '9eHF1ew2+CouVvFIvruhDE2vmMqEKMegwMaRdck6WXXKrC8RpJOyJF/44cCp3jDR9DSRwd26astM+AStfpfdrg=='
  }
  async getBlockBlobClient(fileName: string): Promise<BlockBlobClient> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureConnection,
    );
    const blobContainer = blobServiceClient.getContainerClient(this.container);

    return blobContainer.getBlockBlobClient(fileName);
  }

  async uploadFile(file, file_name) {
    const blockBlobClient = await this.getBlockBlobClient(file_name);
    const fileUrl = blockBlobClient.url;
    await blockBlobClient.uploadData(file.buffer);

    return fileUrl;
  }

  async deleteFile(file_name: string, containerName: string) {
    const blockBlobClient = await this.getBlockBlobClient(file_name);
    await blockBlobClient.deleteIfExists();
  }

  public async downloadFile(file_name: string) {
    const blockBlobClient = await this.getBlockBlobClient(file_name);
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    return downloadBlockBlobResponse.readableStreamBody;
  }
}
