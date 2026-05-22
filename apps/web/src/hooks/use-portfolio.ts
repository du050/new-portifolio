import type { PortfolioContent } from '@portfolio/shared';
import { useEffect } from 'react';
import { usePortfolioStore } from '@/stores/portfolio-store';

interface UsePortfolioResult {
  readonly data: PortfolioContent | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;
  readonly refetch: () => Promise<void>;
}

export function usePortfolio(): UsePortfolioResult {
  const content = usePortfolioStore((state) => state.content);
  const isLoading = usePortfolioStore((state) => state.isLoading);
  const hasError = usePortfolioStore((state) => state.hasError);
  const errorMessage = usePortfolioStore((state) => state.errorMessage);
  const fetchPortfolio = usePortfolioStore((state) => state.fetchPortfolio);

  useEffect(() => {
    void fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    data: content,
    isLoading,
    hasError,
    errorMessage,
    refetch: fetchPortfolio,
  };
}
