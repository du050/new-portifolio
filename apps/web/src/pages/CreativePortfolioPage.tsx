import { AboutSection } from '@/components/sections/AboutSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { GitHubStats, PortfolioContent } from '@portfolio/shared';

interface CreativePortfolioPageProps {
  readonly portfolio: PortfolioContent | null;
  readonly githubStats: GitHubStats | null;
  readonly isLoading: boolean;
  readonly isGitHubLoading: boolean;
}

export function CreativePortfolioPage({
  portfolio,
  githubStats,
  isLoading,
  isGitHubLoading,
}: CreativePortfolioPageProps): React.JSX.Element {
  return (
    <PageWrapper>
      <HeroSection profile={portfolio?.profile ?? null} isLoading={isLoading} />
      <AboutSection profile={portfolio?.profile ?? null} isLoading={isLoading} />
      <WorkflowSection />
      <SkillsSection
        categories={portfolio?.skillCategories ?? []}
        isLoading={isLoading}
      />
      <ProjectsSection projects={portfolio?.projects ?? []} isLoading={isLoading} />
      <ExperienceSection
        experiences={portfolio?.experiences ?? []}
        isLoading={isLoading}
      />
      <CertificationsSection
        certifications={portfolio?.certifications ?? []}
        learningPaths={portfolio?.learningPaths ?? []}
        isLoading={isLoading}
      />
      <GitHubSection stats={githubStats} isLoading={isGitHubLoading} />
      <ContactSection profile={portfolio?.profile ?? null} />
    </PageWrapper>
  );
}
