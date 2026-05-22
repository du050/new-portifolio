import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { motionEasing } from '@/lib/animations';

interface ParallaxLayerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly offset?: number;
}

export function ParallaxLayer({
  children,
  className,
  offset = 48,
}: ParallaxLayerProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(rawY, motionEasing.softSpring);

  return (
    <motion.div ref={ref} className={className} style={{ y: shouldReduceMotion ? 0 : y }}>
      {children}
    </motion.div>
  );
}
