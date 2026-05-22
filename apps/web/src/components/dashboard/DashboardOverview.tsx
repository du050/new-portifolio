import type { GitHubStats, PortfolioContent } from '@portfolio/shared';
import { DashboardWorkspace } from '@/components/dashboard/DashboardWorkspace';

interface DashboardOverviewProps {
  readonly portfolio: PortfolioContent | null;
  readonly githubStats: GitHubStats | null;
  readonly isLoading: boolean;
}

/** @deprecated Use DashboardWorkspace — kept as thin wrapper for HomePage import stability */
export function DashboardOverview(props: DashboardOverviewProps): React.JSX.Element {
  return <DashboardWorkspace {...props} />;
}
