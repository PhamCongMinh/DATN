import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@Injectable()
export class TestcaseService {
  constructor(private loggerService: LoggerService) {
    this.loggerService.getLogger('TestcaseService');
  }

  // async getAllRentalNews(ownerId: string) {
  //   return this.rentalNewsRepository.findByOwnerId(ownerId);
  // }
  //
  // async createRentalNews(ownerId: string, rentalNewsData: IRentalNews) {
  //   const data = { ...rentalNewsData, ownerId };
  //   return this.rentalNewsRepository.create(data);
  // }
  //
  // async deleteRentalNews(id: string) {
  //   return this.rentalNewsRepository.delete(id);
  // }
  //
  // async updateRentalNews(id: string, rentalNewsData: UpdateRentalNewsDto) {
  //   const rentalNews = await this.rentalNewsRepository.findById(id);
  //   if (!rentalNews)
  //     throw new BadRequestException({
  //       message: ErrorConstant.RENTOUT.NOT_EXIST_RENTALNEWS,
  //     });
  //
  //   return this.rentalNewsRepository.update(id, rentalNewsData);
  // }
}
