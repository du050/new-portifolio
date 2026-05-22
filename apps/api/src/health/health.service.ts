import { Injectable } from '@nestjs/common';
import type { HealthCheckResponse } from '@portfolio/shared';
import { PrismaService } from '../prisma/prisma.service';

const APP_VERSION = '1.0.0';
const START_TIME = Date.now();

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkHealth(): Promise<HealthCheckResponse> {
    const isDatabaseConnected = await this.prismaService.isHealthy();
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);

    return {
      status: isDatabaseConnected ? 'ok' : 'degraded',
      version: APP_VERSION,
      uptime,
      database: isDatabaseConnected ? 'connected' : 'disconnected',
    };
  }
}
