import { DashboardAuthGate } from '@/components/dashboard/DashboardAuthGate';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ModeAwareAppShell } from '@/components/layout/ModeAwareAppShell';
import { CreativePortfolioPage } from '@/pages/CreativePortfolioPage';
import { useDashboardDeepLink } from '@/hooks/use-dashboard-deep-link';
import { usePortfolio } from '@/hooks/use-portfolio';
import { useGitHubStats } from '@/hooks/use-github-stats';

export function HomePage(): React.JSX.Element {
  useDashboardDeepLink();
  const { data: portfolio, isLoading } = usePortfolio();
  const { data: githubStats, isLoading: isGitHubLoading } = useGitHubStats();

  return (
    <ModeAwareAppShell
      creative={
        <CreativePortfolioPage
          portfolio={portfolio}
          githubStats={githubStats}
          isLoading={isLoading}
          isGitHubLoading={isGitHubLoading}
        />
      }
      dashboard={
        <DashboardAuthGate>
          <DashboardOverview
            portfolio={portfolio}
            githubStats={githubStats}
            isLoading={isLoading}
          />
        </DashboardAuthGate>
      }
    />
  );
}
