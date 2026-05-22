import { AnimatePresence, motion } from 'framer-motion';
import type { GitHubStats, PortfolioContent } from '@portfolio/shared';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import {
  DashboardAnalyticsPanel,
  DashboardContactPanel,
  DashboardExperiencePanel,
  DashboardGrowthPanel,
  DashboardOverviewPanel,
  DashboardProcessPanel,
  DashboardProfilePanel,
  DashboardProjectsPanel,
  DashboardSkillsPanel,
} from '@/components/dashboard/dashboard-tab-panels';
import { DashboardAdminPanel } from '@/components/dashboard/DashboardAdminPanel';
import { DevOpsMonitoringPanel } from '@/components/dashboard/DevOpsMonitoringPanel';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';

interface DashboardWorkspaceProps {
  readonly portfolio: PortfolioContent | null;
  readonly githubStats: GitHubStats | null;
  readonly isLoading: boolean;
}

const PANEL_VARIANTS = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function DashboardWorkspace({
  portfolio,
  githubStats,
  isLoading,
}: DashboardWorkspaceProps): React.JSX.Element {
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const searchQuery = useDashboardTabStore((state) => state.searchQuery);

  const panelProps = {
    portfolio,
    githubStats,
    isLoading,
    searchQuery,
  };

  const renderPanel = (): React.JSX.Element => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverviewPanel {...panelProps} />;
      case 'profile':
        return <DashboardProfilePanel {...panelProps} />;
      case 'process':
        return <DashboardProcessPanel {...panelProps} />;
      case 'skills':
        return <DashboardSkillsPanel {...panelProps} />;
      case 'projects':
        return <DashboardProjectsPanel {...panelProps} />;
      case 'experience':
        return <DashboardExperiencePanel {...panelProps} />;
      case 'growth':
        return <DashboardGrowthPanel {...panelProps} />;
      case 'analytics':
        return <DashboardAnalyticsPanel {...panelProps} />;
      case 'observability':
        return <DevOpsMonitoringPanel />;
      case 'contact':
        return <DashboardContactPanel {...panelProps} />;
      case 'admin':
        return <DashboardAdminPanel />;
      default:
        return <DashboardOverviewPanel {...panelProps} />;
    }
  };

  return (
    <DashboardShell profileName={portfolio?.profile.name}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={PANEL_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderPanel()}
        </motion.div>
      </AnimatePresence>
    </DashboardShell>
  );
}
