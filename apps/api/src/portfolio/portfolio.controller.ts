import { Controller, Get, Param } from '@nestjs/common';
import type {
  ApiResponse,
  Certification,
  Experience,
  LearningPath,
  PortfolioContent,
  Profile,
  Project,
  SkillCategory,
} from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getPortfolio(): Promise<ApiResponse<PortfolioContent>> {
    const content = await this.portfolioService.getPortfolioContent();
    return createApiResponse(content);
  }

  @Get('profile')
  async getProfile(): Promise<ApiResponse<Profile>> {
    const profile = await this.portfolioService.getProfile();
    return createApiResponse(profile);
  }

  @Get('skills')
  async getSkills(): Promise<ApiResponse<readonly SkillCategory[]>> {
    const skills = await this.portfolioService.getSkillCategories();
    return createApiResponse(skills);
  }

  @Get('projects')
  async getProjects(): Promise<ApiResponse<readonly Project[]>> {
    const projects = await this.portfolioService.getProjects();
    return createApiResponse(projects);
  }

  @Get('projects/:slug')
  async getProjectBySlug(@Param('slug') slug: string): Promise<ApiResponse<Project>> {
    const project = await this.portfolioService.getProjectBySlug(slug);
    return createApiResponse(project);
  }

  @Get('experience')
  async getExperience(): Promise<ApiResponse<readonly Experience[]>> {
    const experience = await this.portfolioService.getExperiences();
    return createApiResponse(experience);
  }

  @Get('certifications')
  async getCertifications(): Promise<ApiResponse<readonly Certification[]>> {
    const certifications = await this.portfolioService.getCertifications();
    return createApiResponse(certifications);
  }

  @Get('learning')
  async getLearning(): Promise<ApiResponse<readonly LearningPath[]>> {
    const learning = await this.portfolioService.getLearningPaths();
    return createApiResponse(learning);
  }
}
