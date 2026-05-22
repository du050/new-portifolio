import { PrismaClient } from '@prisma/client';
import { GITHUB_FALLBACK_STATS, PORTFOLIO_SEED_CONTENT } from './seed-data';

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

async function main(): Promise<void> {
  const prisma = new PrismaClient();
  try {
    await seedPortfolio(prisma);
    await seedGitHub(prisma);
    console.log('Database seeded successfully.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
