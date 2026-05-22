import type { PortfolioContent, Project } from '@portfolio/shared';
import { PORTFOLIO_SEED_CONTENT } from '@portfolio/shared';
import { OBSERVABILITY_PROJECT_SLUG } from '@/lib/project-demo-links';

const FLAGSHIP_PROJECT: Project = PORTFOLIO_SEED_CONTENT.projects[0] as Project;

const LEGACY_OBSERVABILITY_SLUGS: readonly string[] = [
  'devops-observability-dashboard',
  'monitoring-stack',
] as const;

function findFlagshipCandidate(
  projects: readonly Project[],
): Project | undefined {
  return projects.find(
    (project) =>
      LEGACY_OBSERVABILITY_SLUGS.includes(project.slug) ||
      project.category === 'Observability' ||
      project.category === 'Monitoring',
  );
}

function buildFlagshipProject(candidate: Project | undefined): Project {
  if (!candidate) {
    return FLAGSHIP_PROJECT;
  }

  return {
    ...FLAGSHIP_PROJECT,
    ...candidate,
    slug: OBSERVABILITY_PROJECT_SLUG,
    demoUrl: candidate.demoUrl?.trim() ? candidate.demoUrl : FLAGSHIP_PROJECT.demoUrl,
    featured: true,
  };
}

export function normalizePortfolioContent(content: PortfolioContent): PortfolioContent {
  const flagship = buildFlagshipProject(findFlagshipCandidate(content.projects));

  return {
    ...content,
    projects: [flagship],
  };
}
