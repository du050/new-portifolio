import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

const LEGACY_SUPER_ADMIN_EMAIL = 'superadmin@portfolio.dev';

@Injectable()
export class OwnerBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(OwnerBootstrapService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.syncOwnerFromEnvironment();
  }

  async syncOwnerFromEnvironment(): Promise<void> {
    const ownerEmail = this.configService
      .get<string>('SEED_SUPER_ADMIN_EMAIL')
      ?.trim()
      .toLowerCase();
    const ownerPassword = this.configService.get<string>('SEED_SUPER_ADMIN_PASSWORD');
    const ownerName = this.configService.get<string>('SEED_SUPER_ADMIN_NAME') ?? 'Portfolio Owner';
    const nodeEnv = this.configService.get<string>('NODE_ENV') ?? 'development';
    const isProduction = nodeEnv === 'production';

    if (!ownerEmail || !ownerPassword) {
      this.logger.warn(
        'Super Admin login disabled: set SEED_SUPER_ADMIN_EMAIL and SEED_SUPER_ADMIN_PASSWORD in apps/api/.env',
      );
      return;
    }

    const activeSuperAdminCount = await this.usersService.countActiveSuperAdmins();
    if (isProduction && activeSuperAdminCount > 0) {
      return;
    }

    await this.usersService.upsertOwnerSuperAdmin({
      email: ownerEmail,
      password: ownerPassword,
      name: ownerName,
    });
    await this.usersService.deactivateLegacySuperAdmin();

    this.logger.log(`Owner Super Admin ready for sign-in: ${ownerEmail}`);
  }
}
