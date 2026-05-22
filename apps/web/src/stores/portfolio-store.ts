import type { PortfolioContent } from '@portfolio/shared';
import { create } from 'zustand';
import { fetchApi } from '@/lib/api-client';
import { normalizePortfolioContent } from '@/lib/normalize-portfolio-content';
import { PORTFOLIO_FALLBACK } from '@/data/portfolio-fallback';

interface PortfolioState {
  readonly content: PortfolioContent | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;
  readonly publishContent: (content: PortfolioContent) => void;
  readonly fetchPortfolio: () => Promise<void>;
}

function cloneContent(content: PortfolioContent): PortfolioContent {
  return structuredClone(content);
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  content: null,
  isLoading: true,
  hasError: false,
  errorMessage: null,

  publishContent: (rawContent: PortfolioContent): void => {
    const content = normalizePortfolioContent(rawContent);
    set({
      content: cloneContent(content),
      hasError: false,
      errorMessage: null,
    });
  },

  fetchPortfolio: async (): Promise<void> => {
    set({ isLoading: true, hasError: false, errorMessage: null });

    try {
      const response = await fetchApi<PortfolioContent>('/portfolio');
      get().publishContent(response);
    } catch {
      get().publishContent(PORTFOLIO_FALLBACK);
      set({
        hasError: true,
        errorMessage: 'Using cached portfolio data — API unavailable.',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
