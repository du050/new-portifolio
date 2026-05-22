import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthUser, LoginResponse } from '@portfolio/shared';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const account = await this.usersService.findByEmail(dto.email.trim());
    if (!account?.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.usersService.verifyPassword(
      dto.password,
      account.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user: AuthUser = {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
    };

    const accessToken = await this.signToken(user);
    return { accessToken, user };
  }

  async signToken(user: AuthUser): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.signAsync(payload);
  }
}
