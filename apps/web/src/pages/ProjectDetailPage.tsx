import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { usePortfolio } from '@/hooks/use-portfolio';
import { pageTransition } from '@/lib/animations';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useExperienceModeStore } from '@/stores/use-experience-mode-store';
import {
  OBSERVABILITY_DEMO_PATH,
  isInternalDemoUrl,
  isObservabilityProject,
} from '@/lib/project-demo-links';
import { cn } from '@/lib/utils';

export function ProjectDetailPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data: portfolio, isLoading } = usePortfolio();
  const mode = useExperienceModeStore((state) => state.mode);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const isDashboard = mode === 'dashboard';

  const project = portfolio?.projects.find((item) => item.slug === slug);
  const hasLiveDemo =
    project !== undefined &&
    (isObservabilityProject(project.slug) || isInternalDemoUrl(project.demoUrl));

  const liveDemoPath =
    project !== undefined && isInternalDemoUrl(project.demoUrl)
      ? project.demoUrl.startsWith('/')
        ? project.demoUrl
        : `/${project.demoUrl}`
      : OBSERVABILITY_DEMO_PATH;

  const handleBackToProjects = (): void => {
    setActiveTab('projects');
  };

  const contentWrapperClass = cn(
    'mx-auto max-w-4xl px-4 pb-24 sm:px-6',
    isDashboard ? 'pt-2' : 'pt-32',
  );

  if (isLoading) {
    return (
      <div className={contentWrapperClass}>
        <Skeleton className="mb-6 h-8 w-48" />
        <Skeleton className="mb-4 h-12 w-full max-w-lg" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className={cn(contentWrapperClass, 'text-center')}>
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/" onClick={handleBackToProjects} className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Button>
        </Link>
      </div>
    );
  }

  const detailContent = (
    <motion.article {...pageTransition} className={contentWrapperClass}>
      <Link to="/" onClick={handleBackToProjects}>
        <Button variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="h-4 w-4" />
          {isDashboard ? 'Back to project operations' : 'All projects'}
        </Button>
      </Link>

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="accent">{project.category}</Badge>
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{project.longDescription}</p>

      <div className="mt-6 flex gap-3">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Github className="h-4 w-4" />
              Source
            </Button>
          </a>
        )}
        {hasLiveDemo ? (
          <Button variant="accent" asChild magnetic={false}>
            <Link to={liveDemoPath}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open live observability workspace
            </Link>
          </Button>
        ) : null}
        {project.demoUrl && !hasLiveDemo && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="accent">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          </a>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {project.metrics.map((metric) => (
          <Card key={metric.label} glass={!isDashboard}>
            <CardContent className={cn('pt-6 text-center', isDashboard && 'p-4')}>
              <p className="font-mono text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card glass={!isDashboard} className={isDashboard ? 'border-border/80' : ''}>
          <CardHeader>
            <CardTitle className="text-base">Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.challenges.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card glass={!isDashboard} className={isDashboard ? 'border-border/80' : ''}>
          <CardHeader>
            <CardTitle className="text-base">Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.architecture.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card glass={!isDashboard} className={isDashboard ? 'border-border/80' : ''}>
          <CardHeader>
            <CardTitle className="text-base">Scalability</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.scalability.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.article>
  );

  if (isDashboard) {
    return detailContent;
  }

  return <PageWrapper>{detailContent}</PageWrapper>;
}
