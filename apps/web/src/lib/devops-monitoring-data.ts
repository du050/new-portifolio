export type HealthStatus = 'healthy' | 'degraded' | 'down';
export type AlertSeverity = 'info' | 'warning' | 'critical';
export type PipelineStageStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped';
export type PodPhase = 'Running' | 'Pending' | 'CrashLoopBackOff' | 'Succeeded';

export interface MonitoringKpi {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly trend: 'up' | 'down' | 'neutral';
}

export interface PipelineStage {
  readonly id: string;
  readonly label: string;
  readonly status: PipelineStageStatus;
  readonly durationSeconds: number;
  readonly progress: number;
}

export interface DeploymentPipeline {
  readonly id: string;
  readonly name: string;
  readonly branch: string;
  readonly commit: string;
  readonly environment: string;
  readonly startedAt: string;
  readonly stages: readonly PipelineStage[];
}

export interface MonitoredService {
  readonly id: string;
  readonly name: string;
  readonly status: HealthStatus;
  readonly latencyMs: number;
  readonly uptimePercent: number;
  readonly errorRate: number;
  readonly region: string;
}

export interface KubernetesPod {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly node: string;
  readonly phase: PodPhase;
  readonly restarts: number;
  readonly cpuMillicores: number;
  readonly memoryMi: number;
}

export interface KubernetesNodeSummary {
  readonly id: string;
  readonly name: string;
  readonly cpuPercent: number;
  readonly memoryPercent: number;
  readonly podCount: number;
  readonly status: HealthStatus;
}

export interface TimeSeriesPoint {
  readonly timestamp: string;
  readonly value: number;
}

export interface LatencySeriesPoint {
  readonly timestamp: string;
  readonly p50: number;
  readonly p95: number;
  readonly p99: number;
}

export interface MonitoringAlert {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly severity: AlertSeverity;
  readonly service: string;
  readonly timestamp: string;
  readonly isAcknowledged: boolean;
}

export interface MonitoringLogEntry {
  readonly id: string;
  readonly level: 'info' | 'warn' | 'error';
  readonly service: string;
  readonly message: string;
  readonly timestamp: string;
}

export interface CicdActivityItem {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly actor: string;
  readonly timestamp: string;
  readonly type: 'deploy' | 'build' | 'rollback' | 'approval';
}

export interface DevOpsMonitoringSnapshot {
  readonly kpis: readonly MonitoringKpi[];
  readonly pipeline: DeploymentPipeline;
  readonly services: readonly MonitoredService[];
  readonly pods: readonly KubernetesPod[];
  readonly nodes: readonly KubernetesNodeSummary[];
  readonly cpuSeries: readonly TimeSeriesPoint[];
  readonly memorySeries: readonly TimeSeriesPoint[];
  readonly requestSeries: readonly TimeSeriesPoint[];
  readonly errorRateSeries: readonly TimeSeriesPoint[];
  readonly latencySeries: readonly LatencySeriesPoint[];
  readonly alerts: readonly MonitoringAlert[];
  readonly logs: readonly MonitoringLogEntry[];
  readonly cicdActivity: readonly CicdActivityItem[];
}

const SERIES_LENGTH = 24;
const LOG_POOL: readonly Omit<MonitoringLogEntry, 'id' | 'timestamp'>[] = [
  { level: 'info', service: 'portfolio-api', message: 'Health check passed on /api/health' },
  { level: 'info', service: 'ingress', message: 'TLS certificate renewed for portfolio.dev' },
  { level: 'warn', service: 'web-frontend', message: 'Elevated TTFB on static asset route /assets/*' },
  { level: 'info', service: 'worker', message: 'GitHub sync job completed in 1.2s' },
  { level: 'error', service: 'portfolio-api', message: 'Retry succeeded after upstream timeout (postgres)' },
  { level: 'info', service: 'metrics', message: 'Scrape interval aligned to 15s for all targets' },
  { level: 'warn', service: 'portfolio-api', message: 'Rate limit threshold at 78% for contact endpoint' },
  { level: 'info', service: 'deploy-bot', message: 'Canary analysis: error rate within SLO window' },
] as const;

function formatClock(offsetMinutes: number): string {
  const date = new Date(Date.now() - offsetMinutes * 60_000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function jitter(base: number, variance: number): number {
  return base + (Math.random() - 0.5) * variance;
}

function buildTimeSeries(base: number, variance: number): readonly TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  for (let index = SERIES_LENGTH - 1; index >= 0; index -= 1) {
    points.push({
      timestamp: formatClock(index * 5),
      value: Math.round(clamp(jitter(base, variance), 0, 100)),
    });
  }
  return points;
}

function buildLatencySeries(): readonly LatencySeriesPoint[] {
  const points: LatencySeriesPoint[] = [];
  for (let index = SERIES_LENGTH - 1; index >= 0; index -= 1) {
    const p50 = jitter(42, 12);
    points.push({
      timestamp: formatClock(index * 5),
      p50,
      p95: Math.round(p50 * 1.8),
      p99: Math.round(p50 * 2.6),
    });
  }
  return points;
}

function buildPipeline(): DeploymentPipeline {
  return {
    id: 'deploy-main-4821',
    name: 'portfolio-platform',
    branch: 'main',
    commit: 'a4f91c2',
    environment: 'production',
    startedAt: '6m ago',
    stages: [
      { id: 'build', label: 'Build', status: 'success', durationSeconds: 94, progress: 100 },
      { id: 'test', label: 'Test', status: 'success', durationSeconds: 128, progress: 100 },
      { id: 'scan', label: 'Security scan', status: 'success', durationSeconds: 76, progress: 100 },
      { id: 'deploy', label: 'Deploy', status: 'running', durationSeconds: 42, progress: 68 },
      { id: 'verify', label: 'Verify', status: 'pending', durationSeconds: 0, progress: 0 },
    ],
  };
}

function buildServices(): readonly MonitoredService[] {
  return [
    { id: 'api', name: 'portfolio-api', status: 'healthy', latencyMs: 42, uptimePercent: 99.98, errorRate: 0.12, region: 'us-east-1' },
    { id: 'db', name: 'PostgreSQL', status: 'healthy', latencyMs: 8, uptimePercent: 99.99, errorRate: 0.01, region: 'us-east-1' },
    { id: 'web', name: 'web-frontend', status: 'degraded', latencyMs: 186, uptimePercent: 99.84, errorRate: 0.34, region: 'global' },
    { id: 'worker', name: 'github-sync-worker', status: 'healthy', latencyMs: 120, uptimePercent: 99.91, errorRate: 0.08, region: 'us-east-1' },
    { id: 'ingress', name: 'ingress-gateway', status: 'healthy', latencyMs: 24, uptimePercent: 99.97, errorRate: 0.05, region: 'global' },
    { id: 'metrics', name: 'metrics-collector', status: 'healthy', latencyMs: 15, uptimePercent: 99.95, errorRate: 0.02, region: 'us-east-1' },
  ];
}

function buildPods(): readonly KubernetesPod[] {
  return [
    { id: 'p1', name: 'portfolio-api-7f8b9c-2xk9m', namespace: 'production', node: 'node-a', phase: 'Running', restarts: 0, cpuMillicores: 124, memoryMi: 312 },
    { id: 'p2', name: 'portfolio-api-7f8b9c-8j2pq', namespace: 'production', node: 'node-b', phase: 'Running', restarts: 1, cpuMillicores: 118, memoryMi: 298 },
    { id: 'p3', name: 'web-frontend-5d4a1b-k7m2n', namespace: 'production', node: 'node-a', phase: 'Running', restarts: 0, cpuMillicores: 42, memoryMi: 128 },
    { id: 'p4', name: 'github-worker-9c2d0e-m4p1q', namespace: 'production', node: 'node-c', phase: 'Running', restarts: 0, cpuMillicores: 86, memoryMi: 196 },
    { id: 'p5', name: 'metrics-agent-2b1f8a-n8k3r', namespace: 'observability', node: 'node-b', phase: 'Running', restarts: 0, cpuMillicores: 64, memoryMi: 144 },
    { id: 'p6', name: 'postgres-proxy-1a9e7c-p2w8s', namespace: 'data', node: 'node-c', phase: 'Running', restarts: 0, cpuMillicores: 38, memoryMi: 88 },
  ];
}

function buildNodes(): readonly KubernetesNodeSummary[] {
  return [
    { id: 'n1', name: 'node-a', cpuPercent: 58, memoryPercent: 62, podCount: 12, status: 'healthy' },
    { id: 'n2', name: 'node-b', cpuPercent: 71, memoryPercent: 68, podCount: 14, status: 'healthy' },
    { id: 'n3', name: 'node-c', cpuPercent: 49, memoryPercent: 54, podCount: 10, status: 'healthy' },
  ];
}

function buildAlerts(): readonly MonitoringAlert[] {
  return [
    { id: 'a1', title: 'Elevated p95 latency', detail: 'API gateway p95 above 180ms for 8 minutes', severity: 'warning', service: 'web-frontend', timestamp: '3m ago', isAcknowledged: false },
    { id: 'a2', title: 'Deploy in progress', detail: 'Canary rollout at 68% — monitoring error budget', severity: 'info', service: 'portfolio-api', timestamp: '5m ago', isAcknowledged: true },
    { id: 'a3', title: 'Pod restart detected', detail: 'portfolio-api-7f8b9c-8j2pq restarted once (OOM threshold not reached)', severity: 'warning', service: 'portfolio-api', timestamp: '22m ago', isAcknowledged: true },
  ];
}

function buildCicdActivity(): readonly CicdActivityItem[] {
  return [
    { id: 'c1', title: 'Pipeline triggered', detail: 'main · a4f91c2 · portfolio-platform', actor: 'ci-bot', timestamp: '6m ago', type: 'build' },
    { id: 'c2', title: 'Security scan passed', detail: '0 critical · 2 low findings archived', actor: 'security-scan', timestamp: '4m ago', type: 'build' },
    { id: 'c3', title: 'Canary deploy started', detail: '25% traffic shift to revision 4821', actor: 'deploy-bot', timestamp: '2m ago', type: 'deploy' },
    { id: 'c4', title: 'Approval granted', detail: 'Production deploy approved by platform-owner', actor: 'owner', timestamp: '8m ago', type: 'approval' },
  ];
}

function buildInitialLogs(): readonly MonitoringLogEntry[] {
  return LOG_POOL.slice(0, 6).map((entry, index) => ({
    id: `log-init-${index}`,
    ...entry,
    timestamp: formatClock(index + 1),
  }));
}

export function buildInitialMonitoringSnapshot(): DevOpsMonitoringSnapshot {
  return {
    kpis: [
      { id: 'uptime', label: 'Platform uptime', value: '99.97%', change: '+0.04% vs 7d', trend: 'up' },
      { id: 'latency', label: 'p95 latency', value: '186ms', change: '-12ms vs 1h', trend: 'up' },
      { id: 'rps', label: 'Request rate', value: '1.24k/s', change: '+8.2% peak traffic', trend: 'up' },
      { id: 'errors', label: 'Error rate', value: '0.18%', change: 'Within SLO budget', trend: 'neutral' },
      { id: 'deploys', label: 'Deploy frequency', value: '14/wk', change: '3 successful today', trend: 'neutral' },
    ],
    pipeline: buildPipeline(),
    services: buildServices(),
    pods: buildPods(),
    nodes: buildNodes(),
    cpuSeries: buildTimeSeries(52, 18),
    memorySeries: buildTimeSeries(61, 14),
    requestSeries: buildTimeSeries(72, 22),
    errorRateSeries: buildTimeSeries(0.2, 0.15),
    latencySeries: buildLatencySeries(),
    alerts: buildAlerts(),
    logs: buildInitialLogs(),
    cicdActivity: buildCicdActivity(),
  };
}

function shiftSeries(series: readonly TimeSeriesPoint[], nextValue: number): readonly TimeSeriesPoint[] {
  const next = [...series.slice(1), { timestamp: formatClock(0), value: Math.round(nextValue) }];
  return next;
}

function shiftLatency(series: readonly LatencySeriesPoint[]): readonly LatencySeriesPoint[] {
  const last = series[series.length - 1];
  const p50 = last ? jitter(last.p50, 8) : 42;
  const point: LatencySeriesPoint = {
    timestamp: formatClock(0),
    p50,
    p95: Math.round(p50 * 1.85),
    p99: Math.round(p50 * 2.55),
  };
  return [...series.slice(1), point];
}

function appendLog(logs: readonly MonitoringLogEntry[]): readonly MonitoringLogEntry[] {
  const index = Math.floor(Math.random() * LOG_POOL.length);
  const template = LOG_POOL[index];
  const entry: MonitoringLogEntry = {
    id: `log-${Date.now()}`,
    level: template?.level ?? 'info',
    service: template?.service ?? 'portfolio-api',
    message: template?.message ?? 'Telemetry heartbeat',
    timestamp: formatClock(0),
  };
  return [entry, ...logs].slice(0, 12);
}

export function tickMonitoringSnapshot(
  snapshot: DevOpsMonitoringSnapshot,
): DevOpsMonitoringSnapshot {
  const lastCpu = snapshot.cpuSeries[snapshot.cpuSeries.length - 1]?.value ?? 50;
  const lastMem = snapshot.memorySeries[snapshot.memorySeries.length - 1]?.value ?? 60;
  const lastReq = snapshot.requestSeries[snapshot.requestSeries.length - 1]?.value ?? 70;
  const lastErr = snapshot.errorRateSeries[snapshot.errorRateSeries.length - 1]?.value ?? 0.2;

  const deployStage = snapshot.pipeline.stages.find((stage) => stage.status === 'running');
  const updatedStages = snapshot.pipeline.stages.map((stage) => {
    if (stage.id !== deployStage?.id) {
      return stage;
    }
    const progress = clamp(stage.progress + jitter(4, 6), 0, 100);
    return {
      ...stage,
      progress,
      status: progress >= 100 ? ('success' as const) : stage.status,
      durationSeconds: stage.durationSeconds + 3,
    };
  });

  const services = snapshot.services.map((service) => ({
    ...service,
    latencyMs: Math.round(clamp(jitter(service.latencyMs, 18), 8, 320)),
    errorRate: Number(clamp(jitter(service.errorRate, 0.08), 0, 2).toFixed(2)),
  }));

  const requestKpi = snapshot.kpis.find((kpi) => kpi.id === 'rps');
  const updatedKpis = snapshot.kpis.map((kpi) => {
    if (kpi.id !== 'rps' || !requestKpi) {
      return kpi;
    }
    const rps = 1.1 + Math.random() * 0.3;
    return { ...kpi, value: `${rps.toFixed(2)}k/s` };
  });

  return {
    ...snapshot,
    kpis: updatedKpis,
    pipeline: { ...snapshot.pipeline, stages: updatedStages },
    services,
    cpuSeries: shiftSeries(snapshot.cpuSeries, lastCpu + jitter(0, 6)),
    memorySeries: shiftSeries(snapshot.memorySeries, lastMem + jitter(0, 5)),
    requestSeries: shiftSeries(snapshot.requestSeries, lastReq + jitter(0, 8)),
    errorRateSeries: shiftSeries(snapshot.errorRateSeries, lastErr + jitter(0, 0.08)),
    latencySeries: shiftLatency(snapshot.latencySeries),
    logs: appendLog(snapshot.logs),
  };
}
