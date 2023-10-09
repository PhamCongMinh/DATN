import { Injectable } from '@nestjs/common';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { UpdateRentalNewsDto } from '@modules/rent-out/dto/request/updateRentalNewsDto';
import { IRentalNews } from '@modules/rent-out/interfaces';
import { BadRequestException } from '@shared/exception';
import { ErrorConstant } from '@constants/error.constant';

@Injectable()
export class RentOutService {
  constructor(
    private rentalNewsRepository: RentalNewsRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutService');
  }

  async getAllRentalNews(ownerId: string) {
    return this.rentalNewsRepository.findByOwnerId(ownerId);
  }

  async createRentalNews(ownerId: string, rentalNewsData: IRentalNews) {
    const data = { ...rentalNewsData, ownerId };
    return this.rentalNewsRepository.create(data);
  }

  async deleteRentalNews(id: string) {
    return this.rentalNewsRepository.delete(id);
  }

  async updateRentalNews(id: string, rentalNewsData: UpdateRentalNewsDto) {
    const rentalNews = await this.rentalNewsRepository.findById(id);
    if (!rentalNews)
      throw new BadRequestException({
        message: ErrorConstant.RENTOUT.NOT_EXIST_RENTALNEWS,
      });

    return this.rentalNewsRepository.update(id, rentalNewsData);
  }
}
