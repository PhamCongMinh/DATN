import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import UserRepository from '@models/repositories/User.repository';
import BlogRepository from '@models/repositories/Blog.repository';
import moment from 'moment';

@Injectable()
export class ManageSystemService {
  constructor(
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
    const renterCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'renter',
      });
    const hostCount =
      await this.userRepository.userDocumentModel.countDocuments({
        role: 'host',
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
      renterCount,
      hostCount,
      lastDayUserCount,
      lastDayBlogCount,
      lastDayRenterCount,
      lastDayHostCount,
    };
  }
}
