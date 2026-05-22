import { Activity } from 'lucide-react';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { MonitoringAlerts } from '@/components/dashboard/monitoring/MonitoringAlerts';
import { MonitoringCharts } from '@/components/dashboard/monitoring/MonitoringCharts';
import { MonitoringCicdFeed } from '@/components/dashboard/monitoring/MonitoringCicdFeed';
import { MonitoringKubernetes } from '@/components/dashboard/monitoring/MonitoringKubernetes';
import { MonitoringKpiStrip } from '@/components/dashboard/monitoring/MonitoringKpiStrip';
import { MonitoringLogStream } from '@/components/dashboard/monitoring/MonitoringLogStream';
import { MonitoringPipeline } from '@/components/dashboard/monitoring/MonitoringPipeline';
import { MonitoringServiceHealth } from '@/components/dashboard/monitoring/MonitoringServiceHealth';
import { Skeleton } from '@/components/ui/Skeleton';
import { useLiveMonitoringData } from '@/hooks/use-live-monitoring-data';

export function DevOpsMonitoringPanel(): React.JSX.Element {
  const { snapshot, isLoading, lastUpdatedAt } = useLiveMonitoringData();

  if (isLoading || !snapshot) {
    return (
      <div className="space-y-5">
        <DashboardPageHeader tabId="observability" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={`kpi-skel-${index}`} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="observability"
        description="Internal operations view — deployment health, infrastructure signals, and live telemetry for the portfolio platform."
      />
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="inline-flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-300" />
          Telemetry stream active
        </span>
        <span className="font-mono">Last sync {lastUpdatedAt}</span>
      </div>

      <MonitoringKpiStrip kpis={snapshot.kpis} />
      <MonitoringPipeline pipeline={snapshot.pipeline} />
      <MonitoringServiceHealth services={snapshot.services} />
      <MonitoringKubernetes pods={snapshot.pods} nodes={snapshot.nodes} />
      <MonitoringCharts
        cpuSeries={snapshot.cpuSeries}
        memorySeries={snapshot.memorySeries}
        requestSeries={snapshot.requestSeries}
        errorRateSeries={snapshot.errorRateSeries}
        latencySeries={snapshot.latencySeries}
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <MonitoringAlerts alerts={snapshot.alerts} />
        <MonitoringCicdFeed items={snapshot.cicdActivity} />
      </div>
      <MonitoringLogStream logs={snapshot.logs} />
    </div>
  );
}
