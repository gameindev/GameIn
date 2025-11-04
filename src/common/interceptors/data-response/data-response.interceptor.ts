import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {

    constructor(private readonly configService: ConfigService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Try to extract response object to get status, fallback to 200
                let status = 200;
                const ctx = context.switchToHttp();
                const res = ctx.getResponse?.();
                if (res && typeof res.statusCode === 'number') {
                    status = res.statusCode;
                }
                return {
                    apiVersion: this.configService.get('appConfig.apiVersion'),
                    status: status,
                    data: data
                };
            }),
            catchError((error) => {
                // If it's already an HttpException, re-throw it to preserve the original error structure
                if (error instanceof HttpException) {
                    return throwError(() => error);
                }

                // For non-HTTP exceptions, wrap them in a generic HTTP exception
                return throwError(() => new HttpException(
                    error?.message || 'Internal server error',
                    error?.status || HttpStatus.INTERNAL_SERVER_ERROR
                ));
            })
        );
    }
}
