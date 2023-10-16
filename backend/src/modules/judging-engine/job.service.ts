import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@Injectable()
export class JobService {
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {}
  private logger = this.loggerService.getLogger('JobService');
}
