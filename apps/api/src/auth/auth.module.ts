import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerBootstrapService } from './owner-bootstrap.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresInSeconds = Number(
          configService.get<string>('JWT_EXPIRES_IN_SECONDS') ?? 60 * 60 * 24 * 7,
        );
        return {
          secret: configService.get<string>('JWT_SECRET') ?? 'portfolio-dev-secret-change-me',
          signOptions: { expiresIn: expiresInSeconds },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, OwnerBootstrapService],
  exports: [AuthService, UsersService, JwtModule],
})
export class AuthModule {}
