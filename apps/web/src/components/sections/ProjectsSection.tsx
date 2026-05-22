import { motion } from 'framer-motion';
import type { Project } from '@portfolio/shared';
import { ArrowUpRight, Github, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProjectsSectionProps {
  readonly projects: readonly Project[];
  readonly isLoading: boolean;
}

export function ProjectsSection({
  projects,
  isLoading,
}: ProjectsSectionProps): React.JSX.Element {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <AnimatedSection id={SECTION_IDS.PROJECTS}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Projects"
          title="Case studies with architecture, taste, and measurable impact"
          description="Each project is framed like a product decision: what was hard, what tradeoffs mattered, and how the system stays maintainable."
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-72" />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8 grid gap-4 md:grid-cols-2"
            >
              {featured.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured
                  className={index === 0 ? 'md:col-span-2' : ''}
                />
              ))}
            </motion.div>

            {others.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {others.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </AnimatedSection>
  );
}

interface ProjectCardProps {
  readonly project: Project;
  readonly featured?: boolean;
  readonly className?: string;
}

function ProjectCard({
  project,
  featured = false,
  className,
}: ProjectCardProps): React.JSX.Element {
  return (
    <motion.div variants={fadeInUp} className={className}>
      <Card
        glass
        className={cn(
          'group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
          featured && 'aurora-card',
          featured && 'md:flex md:flex-row',
        )}
      >
        <div
          className={cn(
            'relative flex items-center justify-center bg-gradient-to-br from-pink-200/50 via-fuchsia-100/40 to-violet-200/50 p-8 dark:from-pink-500/10 dark:via-fuchsia-500/10 dark:to-violet-500/10',
            featured ? 'md:w-2/5' : 'h-32',
          )}
        >
          <div className="absolute inset-4 rounded-[1.5rem] border border-white/30 soft-noise" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-background/70 shadow-sm">
            <Layers3 className="h-7 w-7 text-accent" aria-hidden="true" />
          </div>
          <div className="absolute bottom-5 left-5 font-mono text-4xl font-bold text-muted-foreground/30">
            {project.category.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <CardContent className={cn('flex flex-col p-6', featured && 'md:w-3/5')}>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge variant="accent">{project.category}</Badge>
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-muted/50 px-3 py-2">
                <p className="font-mono text-sm font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-background/45 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Architecture decision
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {project.architecture[0] ?? project.challenges[0]}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Link to={`/projects/${project.slug}`}>
              <Button variant="outline" size="sm">
                Details
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
