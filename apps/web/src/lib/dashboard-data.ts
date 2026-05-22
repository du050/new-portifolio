import type {
  Certification,
  Experience,
  GitHubStats,
  LearningPath,
  PortfolioContent,
  Project,
} from '@portfolio/shared';

export type ProjectStatus = 'active' | 'review' | 'planned' | 'completed';
export type KanbanColumnId = 'backlog' | 'in_progress' | 'review' | 'done';

export interface DashboardMetric {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly trend: 'up' | 'down' | 'neutral';
}

export interface DashboardProjectRow {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly status: ProjectStatus;
  readonly stack: string;
  readonly impact: string;
  readonly owner: string;
  readonly risk: 'low' | 'medium' | 'high';
}

export interface KanbanCard {
  readonly id: string;
  readonly title: string;
  readonly column: KanbanColumnId;
  readonly tag: string;
}

export interface ActivityItem {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly timestamp: string;
  readonly type: 'deploy' | 'commit' | 'alert' | 'learning' | 'project';
}

export interface LogEntry {
  readonly id: string;
  readonly level: 'info' | 'warn' | 'error';
  readonly message: string;
  readonly service: string;
  readonly time: string;
}

export interface ServiceHealth {
  readonly name: string;
  readonly status: 'healthy' | 'degraded' | 'down';
  readonly latencyMs: number;
  readonly uptime: string;
}

interface BuildDashboardDataInput {
  readonly portfolio: PortfolioContent | null;
  readonly githubStats: GitHubStats | null;
}

function mapProjectStatus(index: number, featured: boolean): ProjectStatus {
  if (featured && index === 0) {
    return 'active';
  }
  if (index % 4 === 1) {
    return 'review';
  }
  if (index % 4 === 2) {
    return 'planned';
  }
  if (index % 4 === 3) {
    return 'completed';
  }
  return 'active';
}

function mapProjectRisk(category: string): 'low' | 'medium' | 'high' {
  if (category === 'Infrastructure' || category === 'Cloud') {
    return 'medium';
  }
  if (category === 'Monitoring' || category === 'Observability') {
    return 'high';
  }
  return 'low';
}

export function buildDashboardMetrics(
  portfolio: PortfolioContent | null,
  githubStats: GitHubStats | null,
): readonly DashboardMetric[] {
  const projectCount = portfolio?.projects.length ?? 0;
  const activeCerts =
    portfolio?.certifications.filter((cert) => cert.status === 'in_progress')
      .length ?? 0;

  return [
    {
      id: 'uptime',
      label: 'Platform Uptime',
      value: '99.97%',
      change: '+0.12% vs last week',
      trend: 'up',
    },
    {
      id: 'projects',
      label: 'Active Initiatives',
      value: String(projectCount),
      change: `${Math.min(projectCount, 4)} in delivery`,
      trend: 'neutral',
    },
    {
      id: 'deploy',
      label: 'Deploy Velocity',
      value: '3.2x',
      change: 'Faster release cadence',
      trend: 'up',
    },
    {
      id: 'github',
      label: 'GitHub Signals',
      value: String(githubStats?.totalCommits ?? 0),
      change: `${githubStats?.publicRepos ?? 0} public repos`,
      trend: 'up',
    },
    {
      id: 'learning',
      label: 'Learning Tracks',
      value: String(portfolio?.learningPaths.length ?? 0),
      change: `${activeCerts} cert in progress`,
      trend: 'neutral',
    },
  ];
}

export function buildProjectRows(
  projects: readonly Project[],
  profileName: string,
): readonly DashboardProjectRow[] {
  return projects.map((project, index) => ({
    id: project.id,
    name: project.title,
    category: project.category,
    status: mapProjectStatus(index, project.featured),
    stack: project.techStack.slice(0, 3).join(' · '),
    impact: project.metrics[0]?.value ?? '—',
    owner: profileName,
    risk: mapProjectRisk(project.category),
  }));
}

export function buildKanbanCards(
  projects: readonly Project[],
  learningPaths: readonly LearningPath[],
): readonly KanbanCard[] {
  const projectCards: KanbanCard[] = projects.slice(0, 6).map((project, index) => {
    const columns: readonly KanbanColumnId[] = [
      'backlog',
      'in_progress',
      'review',
      'done',
    ];
    const column = columns[index % columns.length] ?? 'backlog';
    return {
      id: project.id,
      title: project.title,
      column,
      tag: project.category,
    };
  });

  const learningCards: KanbanCard[] = learningPaths.map((path) => ({
    id: path.id,
    title: path.title,
    column: path.progress >= 70 ? 'review' : 'in_progress',
    tag: 'Learning',
  }));

  return [...projectCards, ...learningCards];
}

export function buildActivityFeed(
  projects: readonly Project[],
  experiences: readonly Experience[],
  certifications: readonly Certification[],
  githubStats: GitHubStats | null,
): readonly ActivityItem[] {
  const items: ActivityItem[] = [];

  if (githubStats) {
    items.push({
      id: 'gh-commits',
      title: 'Commit activity synced',
      detail: `${githubStats.totalCommits.toLocaleString()} commits tracked across repositories`,
      timestamp: '12m ago',
      type: 'commit',
    });
  }

  projects.slice(0, 3).forEach((project, index) => {
    items.push({
      id: `proj-${project.id}`,
      title: `${project.title} milestone updated`,
      detail: project.architecture[0] ?? project.description,
      timestamp: `${(index + 1) * 18}m ago`,
      type: 'project',
    });
  });

  experiences
    .filter((experience) => experience.current)
    .forEach((experience) => {
      items.push({
        id: `exp-${experience.id}`,
        title: `${experience.role} delivery note`,
        detail: experience.achievements[0] ?? experience.description,
        timestamp: '1h ago',
        type: 'deploy',
      });
    });

  certifications.forEach((cert) => {
    items.push({
      id: `cert-${cert.id}`,
      title: cert.name,
      detail: cert.description,
      timestamp: cert.status === 'in_progress' ? 'Today' : 'This week',
      type: 'learning',
    });
  });

  return items.slice(0, 8);
}

export function buildLogEntries(projects: readonly Project[]): readonly LogEntry[] {
  const services = ['api-gateway', 'portfolio-api', 'worker', 'metrics'];
  return projects.slice(0, 6).map((project, index) => ({
    id: `log-${project.id}`,
    level: index % 5 === 0 ? 'warn' : 'info',
    message: `Pipeline completed for ${project.slug}`,
    service: services[index % services.length] ?? 'portfolio-api',
    time: `${(index + 1) * 4}m ago`,
  }));
}

export function buildServiceHealth(): readonly ServiceHealth[] {
  return [
    { name: 'Portfolio API', status: 'healthy', latencyMs: 42, uptime: '99.98%' },
    { name: 'PostgreSQL', status: 'healthy', latencyMs: 8, uptime: '99.99%' },
    { name: 'GitHub Sync', status: 'healthy', latencyMs: 156, uptime: '99.90%' },
    { name: 'Web Frontend', status: 'degraded', latencyMs: 210, uptime: '99.82%' },
  ];
}

export function buildDashboardData({
  portfolio,
  githubStats,
}: BuildDashboardDataInput): {
  readonly metrics: readonly DashboardMetric[];
  readonly projectRows: readonly DashboardProjectRow[];
  readonly kanbanCards: readonly KanbanCard[];
  readonly activity: readonly ActivityItem[];
  readonly logs: readonly LogEntry[];
  readonly services: readonly ServiceHealth[];
} {
  const profileName = portfolio?.profile.name ?? 'Engineer';
  const projects = portfolio?.projects ?? [];
  const experiences = portfolio?.experiences ?? [];
  const certifications = portfolio?.certifications ?? [];
  const learningPaths = portfolio?.learningPaths ?? [];

  return {
    metrics: buildDashboardMetrics(portfolio, githubStats),
    projectRows: buildProjectRows(projects, profileName),
    kanbanCards: buildKanbanCards(projects, learningPaths),
    activity: buildActivityFeed(
      projects,
      experiences,
      certifications,
      githubStats,
    ),
    logs: buildLogEntries(projects),
    services: buildServiceHealth(),
  };
}
