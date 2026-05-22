import { DashboardAuthGate } from '@/components/dashboard/DashboardAuthGate';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { CreativeAppShell } from '@/components/layout/CreativeAppShell';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { usePortfolio } from '@/hooks/use-portfolio';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

export function ProjectDetailRoute(): React.JSX.Element {
  const mode = useExperienceModeStore((state) => state.mode);
  const { data: portfolio } = usePortfolio();

  if (mode === 'dashboard') {
    return (
      <DashboardAuthGate>
        <DashboardShell profileName={portfolio?.profile.name}>
          <ProjectDetailPage />
        </DashboardShell>
      </DashboardAuthGate>
    );
  }

  return (
    <CreativeAppShell>
      <ProjectDetailPage />
    </CreativeAppShell>
  );
}
