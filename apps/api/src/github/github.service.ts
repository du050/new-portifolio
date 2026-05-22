import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GITHUB_FALLBACK_STATS, type GitHubStats } from '@portfolio/shared';
import { PrismaService } from '../prisma/prisma.service';

interface GitHubApiUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubApiRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

@Injectable()
export class GithubService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getGitHubStats(): Promise<GitHubStats> {
    const username =
      this.configService.get<string>('GITHUB_USERNAME') ??
      GITHUB_FALLBACK_STATS.username;

    const cached = await this.getCachedStats(username);
    if (cached) {
      return cached;
    }

    const fresh = await this.fetchOrFallback(username);
    await this.cacheStats(username, fresh);
    return fresh;
  }

  private async getCachedStats(username: string): Promise<GitHubStats | null> {
    const snapshot = await this.prismaService.gitHubSnapshot.findFirst({
      where: { username },
      orderBy: { updatedAt: 'desc' },
    });

    if (!snapshot || snapshot.expiresAt < new Date()) {
      return null;
    }

    return snapshot.stats as unknown as GitHubStats;
  }

  private async fetchOrFallback(username: string): Promise<GitHubStats> {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (!token) {
      return this.buildFallbackStats(username);
    }

    try {
      return await this.fetchFromGitHub(username, token);
    } catch {
      return this.buildFallbackStats(username);
    }
  }

  private async fetchFromGitHub(username: string, token: string): Promise<GitHubStats> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });
    if (!userResponse.ok) {
      throw new Error('GitHub user fetch failed');
    }
    const user = (await userResponse.json()) as GitHubApiUser;

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=10`,
      { headers },
    );
    const repos = reposResponse.ok
      ? ((await reposResponse.json()) as GitHubApiRepo[])
      : [];

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const languages = this.aggregateLanguages(repos);

    return {
      username: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalCommits: GITHUB_FALLBACK_STATS.totalCommits,
      languages,
      commitActivity: GITHUB_FALLBACK_STATS.commitActivity,
      contributions: GITHUB_FALLBACK_STATS.contributions,
      topRepositories: repos.slice(0, 4).map((repo) => ({
        name: repo.name,
        description: repo.description ?? '',
        stars: repo.stargazers_count,
        language: repo.language ?? 'Other',
        url: repo.html_url,
      })),
      cachedAt: new Date().toISOString(),
    };
  }

  private aggregateLanguages(
    repos: GitHubApiRepo[],
  ): GitHubStats['languages'] {
    const counts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] ?? 0) + 1;
      }
    }
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0) || 1;
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      Go: '#00add8',
      HCL: '#844fba',
      Shell: '#89e051',
    };

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: colors[name] ?? '#6b7280',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);
  }

  private buildFallbackStats(username: string): GitHubStats {
    return {
      ...GITHUB_FALLBACK_STATS,
      username,
      cachedAt: new Date().toISOString(),
    };
  }

  private async cacheStats(username: string, stats: GitHubStats): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6);

    const existing = await this.prismaService.gitHubSnapshot.findFirst({
      where: { username },
    });

    if (existing) {
      await this.prismaService.gitHubSnapshot.update({
        where: { id: existing.id },
        data: { stats: stats as object, expiresAt },
      });
      return;
    }

    await this.prismaService.gitHubSnapshot.create({
      data: {
        username,
        stats: stats as object,
        expiresAt,
      },
    });
  }
}
