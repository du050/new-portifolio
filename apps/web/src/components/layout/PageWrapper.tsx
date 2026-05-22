import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';

interface PageWrapperProps {
  readonly children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps): React.JSX.Element {
  return (
    <motion.main {...pageTransition} className="min-h-screen">
      {children}
    </motion.main>
  );
}
