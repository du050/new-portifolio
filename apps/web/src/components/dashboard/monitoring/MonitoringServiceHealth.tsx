import { motion } from 'framer-motion';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import { getHealthDotClass } from '@/components/dashboard/monitoring/monitoring-utils';
import type { MonitoredService } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

interface MonitoringServiceHealthProps {
  readonly services: readonly MonitoredService[];
}

export function MonitoringServiceHealth({
  services,
}: MonitoringServiceHealthProps): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard title="Service health" description="Synthetic checks across production services">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
          <tr>
            <th className="px-4 py-2 font-medium">Service</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Latency</th>
            <th className="px-4 py-2 font-medium">Uptime</th>
            <th className="px-4 py-2 font-medium">Error rate</th>
            <th className="px-4 py-2 font-medium">Region</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <motion.tr
              key={service.id}
              layout
              className="border-t border-zinc-100 dark:border-zinc-800"
            >
              <td className="px-4 py-3 font-medium">{service.name}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={cn(
                        'absolute inline-flex h-full w-full animate-ping rounded-full opacity-40',
                        getHealthDotClass(service.status),
                      )}
                    />
                    <span
                      className={cn('relative h-2 w-2 rounded-full', getHealthDotClass(service.status))}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-xs capitalize text-zinc-600 dark:text-zinc-400">
                    {service.status}
                  </span>
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs">{service.latencyMs}ms</td>
              <td className="px-4 py-3 font-mono text-xs">{service.uptimePercent}%</td>
              <td className="px-4 py-3 font-mono text-xs">{service.errorRate}%</td>
              <td className="px-4 py-3 text-xs text-zinc-500">{service.region}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </MonitoringEnterpriseCard>
  );
}
