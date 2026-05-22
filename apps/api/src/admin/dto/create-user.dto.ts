import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import type { UserRole } from '@portfolio/shared';

const USER_ROLES = ['STANDARD', 'ADMIN', 'SUPER_ADMIN'] as const;

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsEnum(USER_ROLES)
  role!: UserRole;
}
