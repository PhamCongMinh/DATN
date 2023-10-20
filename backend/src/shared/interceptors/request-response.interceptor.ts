import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '@shared/modules/loggers/logger.service';

export const defaultResponse: IResponse<[]> = {
  success: true,
  status_code: HttpStatus.OK,
  message: '',
  data: null,
  validator_errors: [],
};

export interface IResponse<T> {
  status_code?: HttpStatus;
  data?: T;
  _metadata?: {
    [key: string]: any;
  };
  message?: string | null;
  success?: boolean;
  validator_errors?: any[];
}
export function createResponse<T>(data: any): IResponse<T> {
  return {
    status_code: data?.status_code ? data.status_code : HttpStatus.OK,
    data: data?.data || data || [],
    _metadata: data?._metadata
      ? { ...data._metadata, timestamp: new Date() }
      : { timestamp: new Date() },
    success: true,
    message: data?.message ? data?.message : '',
  };
}
@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  constructor(private readonly loggingService: LoggerService) {}
  private logger = this.loggingService.getLogger('Request');
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const request = context.switchToHttp().getRequest();
    this.logger.info(request.headers, request.query, request.params);
    //todo: optimize logger body hidden password
    try {
      let body = request?.body;
      if (body && body instanceof Object) {
        body = JSON.parse(JSON.stringify(request?.body));
        if (body?.password) {
          this.logger.info(`Hidden password`);
          delete body.password;
        }
        this.logger.info(`Body: `, body);
      }
    } catch (e) {}
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const responseData = createResponse(data);
        response.status(responseData.status_code);
        return createResponse(data);
      }),
    );
  }
}
