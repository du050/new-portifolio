import { AnimatePresence, motion } from 'framer-motion';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';

interface ExperienceModeContentProps {
  readonly creative: React.ReactNode;
  readonly dashboard: React.ReactNode;
}

const MODE_VARIANTS = {
  initial: { opacity: 0, filter: 'blur(8px)', scale: 0.985 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(6px)', scale: 1.01 },
};

export function ExperienceModeContent({
  creative,
  dashboard,
}: ExperienceModeContentProps): React.JSX.Element {
  const mode = useExperienceModeStore((state) => state.mode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        variants={MODE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        {mode === 'creative' ? creative : dashboard}
      </motion.div>
    </AnimatePresence>
  );
}
