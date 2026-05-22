import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ModeAwareAppShell } from '@/components/layout/ModeAwareAppShell';
import { CreativePortfolioPage } from '@/pages/CreativePortfolioPage';
import { usePortfolio } from '@/hooks/use-portfolio';
import { useGitHubStats } from '@/hooks/use-github-stats';

export function HomePage(): React.JSX.Element {
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
        <DashboardOverview
          portfolio={portfolio}
          githubStats={githubStats}
          isLoading={isLoading}
        />
      }
    />
  );
}
