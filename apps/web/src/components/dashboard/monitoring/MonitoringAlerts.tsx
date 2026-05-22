import { AnimatePresence, motion } from 'framer-motion';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import { getSeverityClass } from '@/components/dashboard/monitoring/monitoring-utils';
import type { MonitoringAlert } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

interface MonitoringAlertsProps {
  readonly alerts: readonly MonitoringAlert[];
}

export function MonitoringAlerts({ alerts }: MonitoringAlertsProps): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard title="Alerts" description="Active signals from SLO and infrastructure monitors">
      <div className="max-h-72 divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{alert.detail}</p>
                  <p className="mt-1 font-mono text-[10px] text-zinc-400">
                    {alert.service} · {alert.timestamp}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase',
                    getSeverityClass(alert.severity),
                  )}
                >
                  {alert.severity}
                </span>
              </div>
              {alert.isAcknowledged ? (
                <span className="mt-2 inline-block text-[10px] text-zinc-400">Acknowledged</span>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MonitoringEnterpriseCard>
  );
}
