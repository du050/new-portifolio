import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import type {
  AdminUserRecord,
  ApiResponse,
  AuthUser,
  PortfolioContent,
} from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PortfolioService } from '../portfolio/portfolio.service';
import { UsersService } from '../auth/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePortfolioContentDto } from './dto/update-portfolio-content.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly usersService: UsersService,
  ) {}

  @Get('portfolio')
  @Roles('STANDARD', 'ADMIN', 'SUPER_ADMIN')
  async getPortfolio(): Promise<ApiResponse<PortfolioContent>> {
    const content = await this.portfolioService.getPortfolioContent();
    return createApiResponse(content);
  }

  @Put('portfolio')
  @Roles('SUPER_ADMIN')
  async updatePortfolio(
    @Body() dto: UpdatePortfolioContentDto,
  ): Promise<ApiResponse<PortfolioContent>> {
    const content = await this.portfolioService.updatePortfolioContent(dto.content);
    return createApiResponse(content);
  }

  @Get('users')
  @Roles('SUPER_ADMIN')
  async listUsers(): Promise<ApiResponse<readonly AdminUserRecord[]>> {
    const users = await this.usersService.listUsers();
    return createApiResponse(users);
  }

  @Post('users')
  @Roles('SUPER_ADMIN')
  async createUser(@Body() dto: CreateUserDto): Promise<ApiResponse<AdminUserRecord>> {
    const user = await this.usersService.createUser(dto);
    return createApiResponse(user);
  }

  @Patch('users/:id/role')
  @Roles('SUPER_ADMIN')
  async updateUserRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
  ): Promise<ApiResponse<AdminUserRecord>> {
    const user = await this.usersService.updateUserRole(id, dto.role);
    return createApiResponse(user);
  }

  @Get('access')
  @Roles('STANDARD', 'ADMIN', 'SUPER_ADMIN')
  getAccess(@CurrentUser() user: AuthUser): ApiResponse<{
    canEditPortfolio: boolean;
    canManageUsers: boolean;
    role: AuthUser['role'];
  }> {
    const isSuperAdmin = user.role === 'SUPER_ADMIN';
    return createApiResponse({
      canEditPortfolio: isSuperAdmin,
      canManageUsers: isSuperAdmin,
      role: user.role,
    });
  }
}
