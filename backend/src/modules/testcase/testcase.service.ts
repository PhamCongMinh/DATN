import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import { CreateTestcaseDto } from '@modules/testcase/dto/create-testcase.dto';

@Injectable()
export class TestcaseService {
  constructor(
    private testcaseRepository: TestcaseRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('TestcaseService');
  }

  async createTestcase(
    author_id: string,
    createTestcaseDto: CreateTestcaseDto,
  ) {
    const newTestcase = await this.testcaseRepository.create({
      ...createTestcaseDto,
      author_id: author_id,
    });

    return newTestcase;
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
