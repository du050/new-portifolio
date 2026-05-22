import { AnimatePresence, motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import type { MonitoringLogEntry } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

interface MonitoringLogStreamProps {
  readonly logs: readonly MonitoringLogEntry[];
}

const LEVEL_CLASS: Record<MonitoringLogEntry['level'], string> = {
  info: 'text-sky-600 dark:text-sky-300',
  warn: 'text-amber-600 dark:text-amber-300',
  error: 'text-red-600 dark:text-red-300',
};

export function MonitoringLogStream({ logs }: MonitoringLogStreamProps): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard
      title="Log stream"
      description="Live application and platform events"
      action={
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <Radio className="h-3 w-3 animate-pulse" />
          Live
        </span>
      }
    >
      <div className="max-h-80 overflow-y-auto font-mono text-xs">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-zinc-100 px-4 py-2.5 last:border-0 dark:border-zinc-800"
            >
              <span className="text-zinc-400">{log.timestamp}</span>{' '}
              <span className={cn(LEVEL_CLASS[log.level])}>[{log.level}]</span>{' '}
              <span className="text-zinc-500">{log.service}</span>
              <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{log.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MonitoringEnterpriseCard>
  );
}
