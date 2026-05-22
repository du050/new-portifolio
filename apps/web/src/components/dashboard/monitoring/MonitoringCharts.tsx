import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import type { LatencySeriesPoint, TimeSeriesPoint } from '@/lib/devops-monitoring-data';

interface MonitoringChartsProps {
  readonly cpuSeries: readonly TimeSeriesPoint[];
  readonly memorySeries: readonly TimeSeriesPoint[];
  readonly requestSeries: readonly TimeSeriesPoint[];
  readonly errorRateSeries: readonly TimeSeriesPoint[];
  readonly latencySeries: readonly LatencySeriesPoint[];
}

const TOOLTIP_STYLE = {
  background: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  fontSize: '12px',
};

function ResourceChart({
  title,
  data,
  color,
  gradientId,
}: {
  readonly title: string;
  readonly data: readonly TimeSeriesPoint[];
  readonly color: string;
  readonly gradientId: string;
}): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard title={title}>
      <div className="h-52 p-4 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[...data]}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="value" stroke={color} fill={`url(#${gradientId})`} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </MonitoringEnterpriseCard>
  );
}

export function MonitoringCharts({
  cpuSeries,
  memorySeries,
  requestSeries,
  errorRateSeries,
  latencySeries,
}: MonitoringChartsProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <ResourceChart title="CPU utilization (%)" data={cpuSeries} color="#6366f1" gradientId="cpuGrad" />
        <ResourceChart title="Memory utilization (%)" data={memorySeries} color="#8b5cf6" gradientId="memGrad" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ResourceChart title="API requests (index)" data={requestSeries} color="#0ea5e9" gradientId="reqGrad" />
        <ResourceChart title="Error rate (%)" data={errorRateSeries} color="#f59e0b" gradientId="errGrad" />
      </div>
      <MonitoringEnterpriseCard title="Latency percentiles (ms)" description="p50 / p95 / p99 over the last 2 hours">
        <div className="h-56 p-4 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...latencySeries]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="p50" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="p95" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="p99" stroke="#f43f5e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MonitoringEnterpriseCard>
    </div>
  );
}
