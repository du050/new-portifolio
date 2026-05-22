export interface LanguageStat {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
}

export interface CommitActivity {
  readonly date: string;
  readonly count: number;
}

export interface ContributionDay {
  readonly date: string;
  readonly count: number;
  readonly level: number;
}

export interface GitHubStats {
  readonly username: string;
  readonly publicRepos: number;
  readonly followers: number;
  readonly following: number;
  readonly totalStars: number;
  readonly totalCommits: number;
  readonly languages: readonly LanguageStat[];
  readonly commitActivity: readonly CommitActivity[];
  readonly contributions: readonly ContributionDay[];
  readonly topRepositories: readonly GitHubRepository[];
  readonly cachedAt: string;
}

export interface GitHubRepository {
  readonly name: string;
  readonly description: string;
  readonly stars: number;
  readonly language: string;
  readonly url: string;
}
