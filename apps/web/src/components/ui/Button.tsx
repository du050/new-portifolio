import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { useMagneticMotion } from '@/hooks/use-magnetic-motion';
import { motionEasing } from '@/lib/animations';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'premium-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
        accent:
          'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white shadow-[0_14px_35px_rgba(217,70,143,0.25)] hover:scale-[1.015] hover:shadow-[0_18px_45px_rgba(217,70,143,0.32)]',
        outline:
          'border border-border bg-transparent hover:border-accent/40 hover:bg-muted text-foreground',
        ghost: 'hover:bg-muted text-foreground',
        glass: 'glass text-foreground hover:bg-muted/50',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
  readonly magnetic?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  magnetic = true,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: ButtonProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const magneticMotion = useMagneticMotion();
  const classes = cn(buttonVariants({ variant, size, className }));

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (magnetic) {
      magneticMotion.handleMouseMove(event);
    }
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    magneticMotion.handleMouseLeave();
    onMouseLeave?.(event);
  };

  if (asChild) {
    const slotProps = props as React.ComponentPropsWithoutRef<typeof Slot>;
    return (
      <Slot
        className={classes}
        style={style as React.CSSProperties | undefined}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...slotProps}
      />
    );
  }

  return (
    <motion.button
      className={classes}
      style={{
        x: magnetic && !shouldReduceMotion ? magneticMotion.x : 0,
        y: magnetic && !shouldReduceMotion ? magneticMotion.y : 0,
        ...style,
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.018 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={motionEasing.softSpring}
      data-cursor="magnetic"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}
