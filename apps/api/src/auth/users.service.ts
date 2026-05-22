import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { AdminUserRecord, AuthUser, UserRole } from '@portfolio/shared';
import { UserRole as PrismaUserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

const BCRYPT_ROUNDS = 12;

export interface CreateUserInput {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: UserRole;
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findActiveById(id: string): Promise<AuthUser | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id, isActive: true },
    });
    if (!user) {
      return null;
    }
    return this.mapToAuthUser(user);
  }

  async findByEmail(email: string): Promise<{
    id: string;
    email: string;
    name: string;
    role: UserRole;
    passwordHash: string;
    isActive: boolean;
  } | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
    };
  }

  async listUsers(): Promise<readonly AdminUserRecord[]> {
    const users = await this.prismaService.user.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return users.map((user) => this.mapToAdminRecord(user));
  }

  async createUser(input: CreateUserInput): Promise<AdminUserRecord> {
    const existing = await this.prismaService.user.findUnique({
      where: { email: input.email },
    });
    if (existing) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
    const user = await this.prismaService.user.create({
      data: {
        email: input.email,
        name: input.name,
        role: input.role as PrismaUserRole,
        passwordHash,
      },
    });
    return this.mapToAdminRecord(user);
  }

  async updateUserRole(id: string, role: UserRole): Promise<AdminUserRecord> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prismaService.user.update({
      where: { id },
      data: { role: role as PrismaUserRole },
    });
    return this.mapToAdminRecord(updated);
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  async upsertSeedUser(input: CreateUserInput): Promise<void> {
    const passwordHash = await this.hashPassword(input.password);
    await this.prismaService.user.upsert({
      where: { email: input.email },
      update: {
        name: input.name,
        role: input.role as PrismaUserRole,
        passwordHash,
        isActive: true,
      },
      create: {
        email: input.email,
        name: input.name,
        role: input.role as PrismaUserRole,
        passwordHash,
      },
    });
  }

  private mapToAuthUser(user: {
    id: string;
    email: string;
    name: string;
    role: PrismaUserRole;
  }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    };
  }

  private mapToAdminRecord(user: {
    id: string;
    email: string;
    name: string;
    role: PrismaUserRole;
    isActive: boolean;
    createdAt: Date;
  }): AdminUserRecord {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
