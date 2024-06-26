import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@Injectable()
export class ContestService {
  constructor(private loggerService: LoggerService) {
    this.loggerService.getLogger('RentService');
  }

  // filterRentalNews(filter: FilterDto) {
  //   console.log(filter);
  //   if (!filter) return this.rentalNewsRepository.getAll();
  //   const {
  //     city,
  //     commune,
  //     district,
  //     minPricePerMonth,
  //     maxPricePerMonth,
  //     maxArea,
  //     minArea,
  //     rentNewsType,
  //   } = filter;
  //
  //   let query = {};
  //   if (city) query = { ...query, city: city };
  //   if (commune) query = { ...query, commune: commune };
  //   if (district) query = { ...query, district: district };
  //   if (rentNewsType) query = { ...query, rentNewsType: rentNewsType };
  //
  //   if (minPricePerMonth && maxPricePerMonth)
  //     query = {
  //       ...query,
  //       pricePerMonth: { $gte: minPricePerMonth, $lte: maxPricePerMonth },
  //     };
  //
  //   if (minPricePerMonth && !maxPricePerMonth)
  //     query = {
  //       ...query,
  //       pricePerMonth: { $gte: minPricePerMonth },
  //     };
  //
  //   if (maxPricePerMonth && !minPricePerMonth)
  //     query = {
  //       ...query,
  //       pricePerMonth: { $lte: maxPricePerMonth },
  //     };
  //
  //   if (minArea && maxArea)
  //     query = {
  //       ...query,
  //       area: { $gte: minArea, $lte: maxArea },
  //     };
  //
  //   if (minArea && !maxArea)
  //     query = {
  //       ...query,
  //       area: { $gte: minArea },
  //     };
  //
  //   if (maxArea && !minArea)
  //     query = {
  //       ...query,
  //       area: { $lte: maxArea },
  //     };
  //
  //   query = {
  //     ...query,
  //     status: RentalStatus.AVAILABLE,
  //     endDay: { $gte: new Date() },
  //   };
  //   console.log('query', query);
  //
  //   return this.rentalNewsRepository.rentalNewsDocument
  //     .find(query)
  //     .populate('ownerId')
  //     .populate({
  //       path: 'comments',
  //       populate: { path: 'ownerId' },
  //     });
  // }
  //
  // async proofOfRented(id: string, proofRentedDto: ProofRentedDto) {
  //   const data = {
  //     ...proofRentedDto,
  //     userId: id,
  //   };
  //   console.log(data);
  //   await this.proofOfRentalRepository.proofOfRentalDocumentModel.create(data);
  //   await this.rentalNewsRepository.rentalNewsDocument.updateOne(
  //     { _id: proofRentedDto.rentalNewsId },
  //     { status: RentalStatus.RENTED },
  //   );
  // }
}
