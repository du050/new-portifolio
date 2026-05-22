import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_DASHBOARD_TAB, type DashboardTabId } from '@/lib/dashboard-tabs';

interface DashboardTabState {
  readonly activeTab: DashboardTabId;
  readonly searchQuery: string;
  readonly setActiveTab: (tab: DashboardTabId) => void;
  readonly setSearchQuery: (query: string) => void;
}

const STORAGE_KEY = 'portfolio-dashboard-tab';

export const useDashboardTabStore = create<DashboardTabState>()(
  persist(
    (set) => ({
      activeTab: DEFAULT_DASHBOARD_TAB,
      searchQuery: '',
      setActiveTab: (tab: DashboardTabId): void => {
        set({ activeTab: tab });
      },
      setSearchQuery: (query: string): void => {
        set({ searchQuery: query });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ activeTab: state.activeTab }),
    },
  ),
);
