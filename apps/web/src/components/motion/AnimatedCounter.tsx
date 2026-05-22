import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motionEasing, motionTimings } from '@/lib/animations';

interface AnimatedCounterProps {
  readonly value: string | number;
  readonly className?: string;
}

function parseCounterValue(value: string | number): {
  readonly numericValue: number | null;
  readonly prefix: string;
  readonly suffix: string;
  readonly decimals: number;
  readonly fallback: string;
} {
  const fallback = String(value);
  const match = fallback.match(/^([^0-9-]*)(-?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { numericValue: null, prefix: '', suffix: '', decimals: 0, fallback };
  }

  const numericValue = Number(match[2]);
  const decimals = match[2]?.includes('.') ? match[2].split('.')[1]?.length ?? 0 : 0;

  return {
    numericValue: Number.isFinite(numericValue) ? numericValue : null,
    prefix: match[1] ?? '',
    suffix: match[3] ?? '',
    decimals,
    fallback,
  };
}

export function AnimatedCounter({
  value,
  className,
}: AnimatedCounterProps): React.JSX.Element {
  const ref = useRef<HTMLSpanElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState<string>(String(value));
  const parsed = useMemo(() => parseCounterValue(value), [value]);

  useEffect(() => {
    if (!isInView || parsed.numericValue === null || shouldReduceMotion) {
      setDisplayValue(parsed.fallback);
      return;
    }

    const controls = animate(motionValue, parsed.numericValue, {
      duration: motionTimings.slow,
      ease: motionEasing.easeOutQuart,
      onUpdate: (latestValue: number) => {
        setDisplayValue(
          `${parsed.prefix}${latestValue.toFixed(parsed.decimals)}${parsed.suffix}`,
        );
      },
    });

    return () => controls.stop();
  }, [isInView, motionValue, parsed, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
