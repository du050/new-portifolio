import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useCallback } from 'react';
import { motionEasing } from '@/lib/animations';

interface MagneticMotionResult {
  readonly x: ReturnType<typeof useSpring>;
  readonly y: ReturnType<typeof useSpring>;
  readonly handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  readonly handleMouseLeave: () => void;
}

const MAGNETIC_STRENGTH = 0.22;

export function useMagneticMotion(): MagneticMotionResult {
  const shouldReduceMotion = useReducedMotion();
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const x = useSpring(motionX, motionEasing.magneticSpring);
  const y = useSpring(motionY, motionEasing.magneticSpring);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      if (shouldReduceMotion) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const relativeX = event.clientX - bounds.left - bounds.width / 2;
      const relativeY = event.clientY - bounds.top - bounds.height / 2;

      motionX.set(relativeX * MAGNETIC_STRENGTH);
      motionY.set(relativeY * MAGNETIC_STRENGTH);
    },
    [motionX, motionY, shouldReduceMotion],
  );

  const handleMouseLeave = useCallback((): void => {
    motionX.set(0);
    motionY.set(0);
  }, [motionX, motionY]);

  return { x, y, handleMouseMove, handleMouseLeave };
}
