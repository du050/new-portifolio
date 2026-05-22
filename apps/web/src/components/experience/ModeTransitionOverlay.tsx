import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import {
  TRANSITION_DURATION_MS,
  useExperienceModeStore,
  type ExperienceMode,
} from '@/stores/use-experience-mode-store';

const MODE_LABELS: Record<ExperienceMode, string> = {
  creative: 'Creative Portfolio',
  dashboard: 'Enterprise Dashboard',
};

export function ModeTransitionOverlay(): React.JSX.Element | null {
  const isTransitioning = useExperienceModeStore((state) => state.isTransitioning);
  const mode = useExperienceModeStore((state) => state.mode);
  const pendingMode = useExperienceModeStore((state) => state.pendingMode);
  const displayMode = pendingMode ?? mode;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-violet-500/10 to-sky-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="relative flex flex-col items-center gap-4 rounded-3xl border border-border bg-card/90 px-8 py-6 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              {displayMode === 'dashboard' ? (
                <LayoutDashboard className="h-6 w-6 text-accent" />
              ) : (
                <Sparkles className="h-6 w-6 text-accent" />
              )}
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Switching mode
            </p>
            <p className="text-lg font-semibold">{MODE_LABELS[displayMode]}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
