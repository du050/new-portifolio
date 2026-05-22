import { Controller, Get } from '@nestjs/common';
import type { ApiResponse, GitHubStats } from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('stats')
  async getStats(): Promise<ApiResponse<GitHubStats>> {
    const stats = await this.githubService.getGitHubStats();
    return createApiResponse(stats);
  }
}
