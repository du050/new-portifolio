import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly glass?: boolean;
  readonly interactive?: boolean;
}

export function Card({
  className,
  glass = false,
  interactive = true,
  children,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: CardProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const [glowPosition, setGlowPosition] = useState<React.CSSProperties>({
    '--cursor-x': '50%',
    '--cursor-y': '50%',
  } as React.CSSProperties);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (interactive && ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      setGlowPosition({
        '--cursor-x': `${event.clientX - bounds.left}px`,
        '--cursor-y': `${event.clientY - bounds.top}px`,
      } as React.CSSProperties);
    }
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>): void => {
    onMouseLeave?.(event);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'premium-card rounded-xl border border-border bg-card text-card-foreground shadow-sm',
        glass && 'glass',
        interactive && 'premium-card-interactive',
        className,
      )}
      style={{ ...glowPosition, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.JSX.Element {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
