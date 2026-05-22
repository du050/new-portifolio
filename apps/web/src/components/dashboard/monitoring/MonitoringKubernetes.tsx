import { MonitoringEnterpriseCard } from '@/components/dashboard/monitoring/MonitoringEnterpriseCard';
import { getHealthDotClass, getPodPhaseClass } from '@/components/dashboard/monitoring/monitoring-utils';
import type { KubernetesNodeSummary, KubernetesPod } from '@/lib/devops-monitoring-data';
import { cn } from '@/lib/utils';

interface MonitoringKubernetesProps {
  readonly pods: readonly KubernetesPod[];
  readonly nodes: readonly KubernetesNodeSummary[];
}

export function MonitoringKubernetes({
  pods,
  nodes,
}: MonitoringKubernetesProps): React.JSX.Element {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <MonitoringEnterpriseCard title="Kubernetes pods" description="Production and observability workloads">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
              <tr>
                <th className="px-4 py-2 font-medium">Pod</th>
                <th className="px-4 py-2 font-medium">Namespace</th>
                <th className="px-4 py-2 font-medium">Node</th>
                <th className="px-4 py-2 font-medium">Phase</th>
                <th className="px-4 py-2 font-medium">CPU</th>
                <th className="px-4 py-2 font-medium">Memory</th>
                <th className="px-4 py-2 font-medium">Restarts</th>
              </tr>
            </thead>
            <tbody>
              {pods.map((pod) => (
                <tr key={pod.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-4 py-3 font-mono text-xs">{pod.name}</td>
                  <td className="px-4 py-3 text-xs">{pod.namespace}</td>
                  <td className="px-4 py-3 text-xs">{pod.node}</td>
                  <td className={cn('px-4 py-3 text-xs font-medium', getPodPhaseClass(pod.phase))}>
                    {pod.phase}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{pod.cpuMillicores}m</td>
                  <td className="px-4 py-3 font-mono text-xs">{pod.memoryMi}Mi</td>
                  <td className="px-4 py-3 font-mono text-xs">{pod.restarts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </MonitoringEnterpriseCard>
      </div>
      <MonitoringEnterpriseCard title="Cluster nodes" description="Capacity overview">
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {nodes.map((node) => (
            <div key={node.id} className="space-y-2 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{node.name}</span>
                <span className="flex items-center gap-1.5 text-xs capitalize text-zinc-500">
                  <span className={cn('h-2 w-2 rounded-full', getHealthDotClass(node.status))} />
                  {node.status}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>CPU</span>
                  <span>{node.cpuPercent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${node.cpuPercent}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Memory</span>
                  <span>{node.memoryPercent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${node.memoryPercent}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-500">{node.podCount} pods scheduled</p>
            </div>
          ))}
        </div>
      </MonitoringEnterpriseCard>
    </div>
  );
}
