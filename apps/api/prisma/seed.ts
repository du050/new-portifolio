import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GITHUB_FALLBACK_STATS, PORTFOLIO_SEED_CONTENT } from './seed-data';

const BCRYPT_ROUNDS = 12;
const DEFAULT_SUPER_ADMIN_PASSWORD = 'SuperAdmin123!';
const DEFAULT_ADMIN_PASSWORD = 'Admin123!';
const DEFAULT_VIEWER_PASSWORD = 'Viewer123!';

const CACHE_TTL_HOURS = 6;

async function seedPortfolio(prisma: PrismaClient): Promise<void> {
  await prisma.portfolioSnapshot.upsert({
    where: { key: 'main' },
    update: {
      content: PORTFOLIO_SEED_CONTENT as object,
      version: 1,
    },
    create: {
      key: 'main',
      content: PORTFOLIO_SEED_CONTENT as object,
      version: 1,
    },
  });
}

async function seedGitHub(prisma: PrismaClient): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);

  const existing = await prisma.gitHubSnapshot.findFirst({
    where: { username: GITHUB_FALLBACK_STATS.username },
  });

  const statsPayload = {
    ...GITHUB_FALLBACK_STATS,
    cachedAt: new Date().toISOString(),
  };

  if (existing) {
    await prisma.gitHubSnapshot.update({
      where: { id: existing.id },
      data: { stats: statsPayload, expiresAt },
    });
    return;
  }

  await prisma.gitHubSnapshot.create({
    data: {
      username: GITHUB_FALLBACK_STATS.username,
      stats: statsPayload,
      expiresAt,
    },
  });
}

async function seedUsers(prisma: PrismaClient): Promise<void> {
  const superAdminPassword =
    process.env.SEED_SUPER_ADMIN_PASSWORD ?? DEFAULT_SUPER_ADMIN_PASSWORD;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
  const viewerPassword = process.env.SEED_VIEWER_PASSWORD ?? DEFAULT_VIEWER_PASSWORD;

  const users = [
    {
      email: 'superadmin@portfolio.dev',
      name: 'Super Admin',
      role: 'SUPER_ADMIN' as const,
      password: superAdminPassword,
    },
    {
      email: 'admin@portfolio.dev',
      name: 'Admin',
      role: 'ADMIN' as const,
      password: adminPassword,
    },
    {
      email: 'viewer@portfolio.dev',
      name: 'Viewer',
      role: 'STANDARD' as const,
      password: viewerPassword,
    },
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        passwordHash,
        isActive: true,
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash,
      },
    });
  }

  console.log('Seeded users: superadmin@portfolio.dev, admin@portfolio.dev, viewer@portfolio.dev');
}

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await seedPortfolio(prisma);
    await seedGitHub(prisma);
    await seedUsers(prisma);
    console.log('Database seeded successfully.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
