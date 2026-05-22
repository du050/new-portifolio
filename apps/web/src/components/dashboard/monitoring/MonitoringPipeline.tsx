import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';
import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import type { DeploymentPipeline, PipelineStageStatus } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

interface MonitoringPipelineProps {
  readonly pipeline: DeploymentPipeline;
}

function StageIcon({ status }: { readonly status: PipelineStageStatus }): React.JSX.Element {
  if (status === 'success') {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  }
  if (status === 'running') {
    return <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />;
  }
  if (status === 'failed') {
    return <XCircle className="h-4 w-4 text-red-600" />;
  }
  return <Circle className="h-4 w-4 text-zinc-400" />;
}

export function MonitoringPipeline({ pipeline }: MonitoringPipelineProps): React.JSX.Element {
  return (
    <MonitoringEnterpriseCard
      title="Deployment pipeline"
      description={`${pipeline.name} · ${pipeline.branch} · ${pipeline.commit} → ${pipeline.environment}`}
      action={
        <span className="font-mono text-xs text-zinc-500">Started {pipeline.startedAt}</span>
      }
    >
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap gap-2">
          {pipeline.stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'flex min-w-[120px] flex-1 flex-col rounded-lg border px-3 py-2',
                stage.status === 'running'
                  ? 'border-indigo-200 bg-indigo-50/80 dark:border-indigo-800 dark:bg-indigo-950/30'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50',
              )}
            >
              <div className="flex items-center gap-2">
                <StageIcon status={stage.status} />
                <span className="text-xs font-medium">{stage.label}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    stage.status === 'success' ? 'bg-emerald-500' : 'bg-indigo-500',
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="mt-1 font-mono text-[10px] text-zinc-500">
                {stage.durationSeconds > 0 ? `${stage.durationSeconds}s` : '—'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </MonitoringEnterpriseCard>
  );
}
