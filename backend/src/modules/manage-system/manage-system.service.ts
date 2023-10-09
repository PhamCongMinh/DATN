import { Injectable } from '@nestjs/common';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import UserRepository from '@models/repositories/User.repository';
import BlogRepository from '@models/repositories/Blog.repository';
import { RentNewsType } from '@models/entities/RentalNews';
import moment from 'moment';

@Injectable()
export class ManageSystemService {
  constructor(
    private rentalNewsRepository: RentalNewsRepository,
    private userRepository: UserRepository,
    private blogRepository: BlogRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ManageSystemService');
  }

  async getSystemInformation() {
    const blogCount =
      await this.blogRepository.blogDocumentModel.countDocuments();
    const userCount =
      await this.userRepository.userDocumentModel.countDocuments();
    const rentalNewsCount =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments();
    const renterCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'renter',
      });
    const hostCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'host',
      });
    const rentalNews1 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE1,
      });
    const rentalNews2 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE2,
      });
    const rentalNews3 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE3,
      });
    const rentalNews4 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE4,
      });

    const lastDayRentalNewsCount =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    const lastDayRentalNews1 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE1,
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });
    const lastDayRentalNews2 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE2,
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });
    const lastDayRentalNews3 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE3,
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });
    const lastDayRentalNews4 =
      await this.rentalNewsRepository.rentalNewsDocument.countDocuments({
        rentNewsType: RentNewsType.TYPE4,
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    const lastDayUserCount =
      await this.userRepository.userDocumentModel.countDocuments({
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    const lastDayRenterCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'renter',
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    const lastDayHostCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'host',
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    const lastDayBlogCount =
      await this.blogRepository.blogDocumentModel.countDocuments({
        created_at: {
          $gte: moment().subtract(1, 'day'),
        },
      });

    return {
      blogCount,
      userCount,
      rentalNewsCount,
      renterCount,
      hostCount,
      rentalNews1,
      rentalNews2,
      rentalNews3,
      rentalNews4,
      lastDayRentalNewsCount,
      lastDayRentalNews1,
      lastDayRentalNews2,
      lastDayRentalNews3,
      lastDayRentalNews4,
      lastDayUserCount,
      lastDayBlogCount,
      lastDayRenterCount,
      lastDayHostCount,
    };
  }
}
