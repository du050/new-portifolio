import type { NavigateFunction } from 'react-router-dom';
import type { DashboardTabId } from '@/lib/dashboard-tabs';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

export const OBSERVABILITY_PROJECT_SLUG = 'devops-observability-dashboard' as const;

export const OBSERVABILITY_DEMO_SEARCH = '?mode=dashboard&tab=observability' as const;

export const OBSERVABILITY_DEMO_PATH = `/${OBSERVABILITY_DEMO_SEARCH}` as const;

const DASHBOARD_TAB_IDS: readonly DashboardTabId[] = [
  'overview',
  'profile',
  'process',
  'skills',
  'projects',
  'experience',
  'growth',
  'analytics',
  'observability',
  'contact',
  'admin',
];

export function isObservabilityProject(slug: string): boolean {
  return slug === OBSERVABILITY_PROJECT_SLUG;
}

export function parseDashboardTabParam(value: string | null): DashboardTabId | null {
  if (!value) {
    return null;
  }
  return DASHBOARD_TAB_IDS.includes(value as DashboardTabId)
    ? (value as DashboardTabId)
    : null;
}

export function isInternalDemoUrl(demoUrl: string): boolean {
  if (!demoUrl) {
    return false;
  }
  return demoUrl.startsWith('/?') || demoUrl.startsWith('/#');
}

export function openObservabilityDashboardDemo(navigate: NavigateFunction): void {
  useExperienceModeStore.getState().setMode('dashboard');
  useDashboardTabStore.getState().setActiveTab('observability');
  navigate(`/${OBSERVABILITY_DEMO_SEARCH}`);
}

export function applyDashboardDeepLink(search: string): void {
  const params = new URLSearchParams(search);
  const mode = params.get('mode');
  const tab = parseDashboardTabParam(params.get('tab'));

  if (mode === 'dashboard') {
    useExperienceModeStore.getState().setMode('dashboard');
  }

  if (tab) {
    useDashboardTabStore.getState().setActiveTab(tab);
  }
}
