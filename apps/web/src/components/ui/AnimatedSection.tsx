import { motion } from 'framer-motion';
import { fadeInUp, premiumViewport, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  readonly id?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly stagger?: boolean;
}

export function AnimatedSection({
  id,
  children,
  className,
  stagger = false,
}: AnimatedSectionProps): React.JSX.Element {
  const variants = stagger ? staggerContainer : fadeInUp;

  return (
    <motion.section
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={premiumViewport}
      className={cn('py-24 md:py-32', className)}
    >
      {children}
    </motion.section>
  );
}
