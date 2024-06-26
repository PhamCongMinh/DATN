import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import * as exc from '@shared//exception';
import { IResponse } from '@shared/interceptors/request-response.interceptor';
import { LoggerService } from '@shared/modules/loggers/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggerService) {}

  private logger = this.loggingService.getLogger('http-exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest();
    // const status = exception.getStatus();
    let excResponse = exception.getResponse() as IResponse<any> | any;
    // this.logger.info(request.headers, request.query, request.params, request.body);
    this.logger.warn(excResponse);
    if (
      typeof excResponse !== 'object' ||
      !excResponse.hasOwnProperty('success')
    ) {
      let newDataResponse: Record<string, any> =
        typeof excResponse === 'object'
          ? excResponse
          : { message: excResponse };
      newDataResponse = newDataResponse?.message;
      excResponse = new exc.BadRequestException({
        status_code: excResponse.status_code
          ? excResponse.status_code
          : HttpStatus.BAD_REQUEST,
        data: excResponse.data ? excResponse.data : null,
        validator_errors: excResponse?.validator_errors
          ? excResponse.validator_errors
          : [],
        message:
          typeof newDataResponse === 'string'
            ? newDataResponse
            : 'unknown message',
      }).getResponse();
    }
    response.status(excResponse.status_code).json(excResponse);
  }
}
