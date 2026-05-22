import { Controller, Get } from '@nestjs/common';
import type { ApiResponse, HealthCheckResponse } from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getHealth(): Promise<ApiResponse<HealthCheckResponse>> {
    const health = await this.healthService.checkHealth();
    return createApiResponse(health);
  }
}
