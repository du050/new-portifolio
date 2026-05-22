import type { PortfolioContent } from '@portfolio/shared';
import { useCallback, useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { PORTFOLIO_FALLBACK } from '@/data/portfolio-fallback';

interface UsePortfolioResult {
  readonly data: PortfolioContent | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;
  readonly refetch: () => void;
}

export function usePortfolio(): UsePortfolioResult {
  const [data, setData] = useState<PortfolioContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);

    try {
      const content = await fetchApi<PortfolioContent>('/portfolio');
      setData(content);
    } catch {
      setData(PORTFOLIO_FALLBACK);
      setHasError(true);
      setErrorMessage('Using cached portfolio data — API unavailable.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPortfolio();
  }, [fetchPortfolio]);

  return { data, isLoading, hasError, errorMessage, refetch: fetchPortfolio };
}
