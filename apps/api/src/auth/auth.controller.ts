import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ApiResponse, AuthUser, LoginResponse } from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

interface OwnerAuthStatus {
  readonly isOwnerConfigured: boolean;
  readonly hasActiveSuperAdmin: boolean;
  readonly ownerEmailHint: string | null;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const result = await this.authService.login(dto);
    return createApiResponse(result);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: AuthUser): Promise<ApiResponse<AuthUser>> {
    return createApiResponse(user);
  }

  @Get('owner-status')
  async getOwnerStatus(): Promise<ApiResponse<OwnerAuthStatus>> {
    const ownerEmail = this.configService.get<string>('SEED_SUPER_ADMIN_EMAIL')?.trim();
    const ownerPassword = this.configService.get<string>('SEED_SUPER_ADMIN_PASSWORD');
    const hasActiveSuperAdmin = (await this.usersService.countActiveSuperAdmins()) > 0;
    return createApiResponse({
      isOwnerConfigured: Boolean(ownerEmail && ownerPassword),
      hasActiveSuperAdmin,
      ownerEmailHint: ownerEmail?.toLowerCase() ?? null,
    });
  }
}
