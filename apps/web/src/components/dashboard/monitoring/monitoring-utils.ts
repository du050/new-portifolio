import type { AlertSeverity, HealthStatus, PodPhase } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

export function getHealthDotClass(status: HealthStatus): string {
  const map: Record<HealthStatus, string> = {
    healthy: 'bg-emerald-500',
    degraded: 'bg-amber-500',
    down: 'bg-red-500',
  };
  return map[status];
}

export function getSeverityClass(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    info: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200',
    warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200',
    critical: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
  };
  return map[severity];
}

export function getPodPhaseClass(phase: PodPhase): string {
  if (phase === 'Running') {
    return 'text-emerald-700 dark:text-emerald-300';
  }
  if (phase === 'CrashLoopBackOff') {
    return 'text-red-700 dark:text-red-300';
  }
  return 'text-amber-700 dark:text-amber-300';
}

export const MONITORING_CARD_CLASS = cn(
  'overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm',
  'dark:border-zinc-800 dark:bg-zinc-900',
);
