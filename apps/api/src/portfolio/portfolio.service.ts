import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  Certification,
  Experience,
  LearningPath,
  PortfolioContent,
  Profile,
  Project,
  SkillCategory,
} from '@portfolio/shared';
import { PrismaService } from '../prisma/prisma.service';

const PORTFOLIO_KEY = 'main';

@Injectable()
export class PortfolioService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPortfolioContent(): Promise<PortfolioContent> {
    return this.loadContent();
  }

  async getProfile(): Promise<Profile> {
    const content = await this.loadContent();
    return content.profile;
  }

  async getSkillCategories(): Promise<readonly SkillCategory[]> {
    const content = await this.loadContent();
    return content.skillCategories;
  }

  async getProjects(): Promise<readonly Project[]> {
    const content = await this.loadContent();
    return content.projects;
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    const content = await this.loadContent();
    const project = content.projects.find((item) => item.slug === slug);
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  async getExperiences(): Promise<readonly Experience[]> {
    const content = await this.loadContent();
    return content.experiences;
  }

  async getCertifications(): Promise<readonly Certification[]> {
    const content = await this.loadContent();
    return content.certifications;
  }

  async getLearningPaths(): Promise<readonly LearningPath[]> {
    const content = await this.loadContent();
    return content.learningPaths;
  }

  private async loadContent(): Promise<PortfolioContent> {
    const snapshot = await this.prismaService.portfolioSnapshot.findUnique({
      where: { key: PORTFOLIO_KEY },
    });

    if (!snapshot) {
      throw new NotFoundException('Portfolio content not found. Run database seed.');
    }

    return snapshot.content as unknown as PortfolioContent;
  }
}
