import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import * as exc from '@shared//exception';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { IResponse } from '@shared/interceptors/request-response.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}
  private logger = this.loggingService.getLogger('http-exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // const status = exception.getStatus();
    let excResponse = exception.getResponse() as IResponse<any> | any;
    this.logger.warn(excResponse);
    if (
      typeof excResponse !== 'object' ||
      !excResponse.hasOwnProperty('success')
    ) {
      let newDataResponse: Record<string, any> =
        typeof excResponse === 'object'
          ? excResponse
          : { message: excResponse };
      newDataResponse = newDataResponse?.error;
      excResponse = new exc.BadRequestException({
        success: false,
        status_code: excResponse.status_code
          ? excResponse.status_code
          : HttpStatus.BAD_REQUEST,
        data: excResponse.data ? excResponse.data : null,
        validator_errors: excResponse?.message ? excResponse.message : [],
        message: typeof newDataResponse === 'string' ? newDataResponse : '',
      }).getResponse();
    }
    response.status(excResponse.status_code).json(excResponse);
  }
}
