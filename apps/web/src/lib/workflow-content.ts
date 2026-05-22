import {
  ClipboardCheck,
  Compass,
  GitPullRequestArrow,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface WorkflowItem {
  readonly title: string;
  readonly description: string;
  readonly signal: string;
  readonly icon: LucideIcon;
}

export const WORKFLOW_ITEMS: readonly WorkflowItem[] = [
  {
    title: 'I start with the user moment',
    description:
      'Before touching code, I map the anxious click, the missing context, and the workflow that needs to feel effortless.',
    signal: 'UX research + product thinking',
    icon: Compass,
  },
  {
    title: 'I make the system legible',
    description:
      'I turn ambiguity into small contracts, typed boundaries, clear APIs, and screens that explain themselves.',
    signal: 'Architecture + clean TypeScript',
    icon: ClipboardCheck,
  },
  {
    title: 'I ship with operational taste',
    description:
      'Deployments, dashboards, alerts, and rollback paths are part of the experience, not an afterthought.',
    signal: 'DevOps + reliability',
    icon: GitPullRequestArrow,
  },
  {
    title: 'I polish the last 10%',
    description:
      'Microcopy, motion, empty states, loading states, and spacing get the same care as the backend logic.',
    signal: 'Creative direction + craft',
    icon: Sparkles,
  },
];

export const WORKFLOW_CALLOUTS = [
  'Turns complex systems into calm interfaces',
  'Designs APIs that frontend teams actually enjoy using',
  'Thinks in release paths, not just happy paths',
] as const;
