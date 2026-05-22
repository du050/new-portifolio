import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import type { ApiResponse, AuthUser, LoginResponse } from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
