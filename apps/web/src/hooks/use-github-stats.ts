import type { GitHubStats } from '@portfolio/shared';
import { useCallback, useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { GITHUB_FALLBACK } from '@/data/github-fallback';

interface UseGitHubStatsResult {
  readonly data: GitHubStats | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly refetch: () => void;
}

export function useGitHubStats(): UseGitHubStatsResult {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchStats = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);

    try {
      const stats = await fetchApi<GitHubStats>('/github/stats');
      setData(stats);
    } catch {
      setData(GITHUB_FALLBACK);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  return { data, isLoading, hasError, refetch: fetchStats };
}
