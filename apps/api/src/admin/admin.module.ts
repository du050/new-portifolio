import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, PortfolioModule],
  controllers: [AdminController],
})
export class AdminModule {}
