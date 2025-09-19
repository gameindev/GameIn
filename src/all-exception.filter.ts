// all-exceptions.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as util from 'node:util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        // Extract status + response body
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody =
            exception instanceof HttpException
                ? exception.getResponse()
                : {
                    message: 'Internal server error',
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                };

        // Log EVERYTHING, including stack and nested causes
        const err =
            exception instanceof Error
                ? exception
                : new Error(util.inspect(exception, { depth: 5 }));

        const cause =
            (err as any).cause instanceof Error
                ? (err as any).cause
                : undefined;

        this.logger.error(
            // pretty-print the error object too (avoids `[object Object]`)
            util.inspect(
                { name: err.name, message: err.message, stack: err.stack, cause },
                { depth: 10, colors: false }
            ),
        );

        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
}
