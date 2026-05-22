import { motion } from 'framer-motion';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import type { MonitoringKpi } from '@/lib/devops-monitoring-data';
import type { DashboardMetric } from '@/lib/dashboard-data';

interface MonitoringKpiStripProps {
  readonly kpis: readonly MonitoringKpi[];
}

function toDashboardMetric(kpi: MonitoringKpi): DashboardMetric {
  return {
    id: kpi.id,
    label: kpi.label,
    value: kpi.value,
    change: kpi.change,
    trend: kpi.trend,
  };
}

export function MonitoringKpiStrip({ kpis }: MonitoringKpiStripProps): React.JSX.Element {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {kpis.map((kpi) => (
        <DashboardMetricCard key={kpi.id} metric={toDashboardMetric(kpi)} />
      ))}
    </motion.div>
  );
}
