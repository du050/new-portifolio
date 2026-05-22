import type { GitHubStats } from '@portfolio/shared';
import { GITHUB_FALLBACK_STATS } from '@portfolio/shared';

export const GITHUB_FALLBACK: GitHubStats = {
  ...GITHUB_FALLBACK_STATS,
  cachedAt: new Date().toISOString(),
};
