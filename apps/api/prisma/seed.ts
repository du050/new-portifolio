import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { GITHUB_FALLBACK_STATS, PORTFOLIO_SEED_CONTENT } from './seed-data';

const BCRYPT_ROUNDS = 12;
const DEFAULT_ADMIN_PASSWORD = 'Admin123!';
const DEFAULT_VIEWER_PASSWORD = 'Viewer123!';
const LEGACY_SUPER_ADMIN_EMAIL = 'superadmin@portfolio.dev';

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

async function seedDemoUsers(prisma: PrismaClient): Promise<void> {
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
  const viewerPassword = process.env.SEED_VIEWER_PASSWORD ?? DEFAULT_VIEWER_PASSWORD;

  const demoUsers = [
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

  for (const user of demoUsers) {
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

  console.log('Seeded demo users: admin@portfolio.dev, viewer@portfolio.dev');
}

async function seedOwnerSuperAdmin(prisma: PrismaClient): Promise<void> {
  const ownerEmail = process.env.SEED_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const ownerPassword = process.env.SEED_SUPER_ADMIN_PASSWORD;
  const ownerName = process.env.SEED_SUPER_ADMIN_NAME ?? 'Portfolio Owner';

  if (!ownerEmail || !ownerPassword) {
    await prisma.user.updateMany({
      where: { email: LEGACY_SUPER_ADMIN_EMAIL },
      data: { isActive: false, role: 'ADMIN' },
    });
    console.log(
      'No owner Super Admin seeded. Set SEED_SUPER_ADMIN_EMAIL and SEED_SUPER_ADMIN_PASSWORD in apps/api/.env (API also syncs owner on startup in development).',
    );
    return;
  }

  const passwordHash = await bcrypt.hash(ownerPassword, BCRYPT_ROUNDS);
  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: { name: ownerName, role: 'SUPER_ADMIN', passwordHash, isActive: true },
    create: { email: ownerEmail, name: ownerName, role: 'SUPER_ADMIN', passwordHash },
  });

  if (ownerEmail !== LEGACY_SUPER_ADMIN_EMAIL) {
    await prisma.user.updateMany({
      where: { email: LEGACY_SUPER_ADMIN_EMAIL },
      data: { isActive: false, role: 'ADMIN' },
    });
  }

  console.log(`Seeded owner Super Admin: ${ownerEmail}`);
}

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await seedPortfolio(prisma);
    await seedGitHub(prisma);
    await seedDemoUsers(prisma);
    await seedOwnerSuperAdmin(prisma);
    console.log('Database seeded successfully.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
