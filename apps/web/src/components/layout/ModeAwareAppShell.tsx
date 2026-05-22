import { ExperienceModeContent } from '@/components/experience/ExperienceModeContent';
import { ModeTransitionOverlay } from '@/components/experience/ModeTransitionOverlay';
import { CreativeAppShell } from '@/components/layout/CreativeAppShell';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

interface ModeAwareAppShellProps {
  readonly creative: React.ReactNode;
  readonly dashboard: React.ReactNode;
}

export function ModeAwareAppShell({
  creative,
  dashboard,
}: ModeAwareAppShellProps): React.JSX.Element {
  const mode = useExperienceModeStore((state) => state.mode);

  return (
    <div
      className={
        mode === 'dashboard'
          ? 'min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950'
          : 'relative min-h-screen bg-background text-foreground'
      }
    >
      <ModeTransitionOverlay />
      <ExperienceModeContent
        creative={<CreativeAppShell>{creative}</CreativeAppShell>}
        dashboard={dashboard}
      />
    </div>
  );
}
