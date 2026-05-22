import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useExperienceModeStore,
  type ExperienceMode,
} from '@/stores/use-experience-mode-store';

interface ExperienceModeSwitchProps {
  readonly variant?: 'compact' | 'full';
  readonly className?: string;
}

export function ExperienceModeSwitch({
  variant = 'full',
  className,
}: ExperienceModeSwitchProps): React.JSX.Element {
  const mode = useExperienceModeStore((state) => state.mode);
  const setMode = useExperienceModeStore((state) => state.setMode);
  const isTransitioning = useExperienceModeStore((state) => state.isTransitioning);

  const handleSelect = (nextMode: ExperienceMode): void => {
    if (!isTransitioning) {
      setMode(nextMode);
    }
  };

  return (
    <div
      className={cn(
        'relative flex rounded-full border border-border bg-muted/50 p-1',
        variant === 'compact' && 'scale-90',
        className,
      )}
      role="group"
      aria-label="Experience mode"
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm"
        layout
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        style={{
          left: mode === 'creative' ? '4px' : '50%',
          width: 'calc(50% - 4px)',
        }}
      />
      <ModeButton
        isActive={mode === 'creative'}
        label={variant === 'full' ? 'Portfolio' : ''}
        icon={Sparkles}
        onClick={() => handleSelect('creative')}
        disabled={isTransitioning}
      />
      <ModeButton
        isActive={mode === 'dashboard'}
        label={variant === 'full' ? 'Dashboard' : ''}
        icon={LayoutDashboard}
        onClick={() => handleSelect('dashboard')}
        disabled={isTransitioning}
      />
    </div>
  );
}

interface ModeButtonProps {
  readonly isActive: boolean;
  readonly label: string;
  readonly icon: React.ElementType;
  readonly onClick: () => void;
  readonly disabled: boolean;
}

function ModeButton({
  isActive,
  label,
  icon: Icon,
  onClick,
  disabled,
}: ModeButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
      aria-pressed={isActive}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}
