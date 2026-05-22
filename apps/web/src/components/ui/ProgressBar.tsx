import { motion, useReducedMotion } from 'framer-motion';
import { cinematicTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  readonly value: number;
  readonly label?: string;
  readonly className?: string;
  readonly color?: string;
}

export function ProgressBar({
  value,
  label,
  className,
  color = 'bg-accent',
}: ProgressBarProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-foreground">{label}</span>
          <span className="font-mono text-xs text-muted-foreground">{clampedValue}%</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Progress ${clampedValue}%`}
      >
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: shouldReduceMotion ? `${clampedValue}%` : 0 }}
          whileInView={{ width: `${clampedValue}%` }}
          viewport={{ once: true }}
          transition={cinematicTransition}
        />
      </div>
    </div>
  );
}
