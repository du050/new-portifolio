import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    this.logger.error(exception);

    const message =
      exception instanceof Prisma.PrismaClientInitializationError
        ? 'Database is unavailable. Start Postgres (Docker) and run npm run db:push && npm run db:seed.'
        : 'Database request failed. Check Postgres connection and migrations.';

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      success: false,
      message,
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
    });
  }
}
