import { IsObject } from 'class-validator';
import type { PortfolioContent } from '@portfolio/shared';

export class UpdatePortfolioContentDto {
  @IsObject()
  content!: PortfolioContent;
}
