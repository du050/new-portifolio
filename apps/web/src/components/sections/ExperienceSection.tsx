import { motion } from 'framer-motion';
import type { Experience } from '@portfolio/shared';
import { Briefcase } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ExperienceSectionProps {
  readonly experiences: readonly Experience[];
  readonly isLoading: boolean;
}

function formatDate(date: string | null): string {
  if (!date) {
    return 'Present';
  }
  const [year, month] = date.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthIndex = Number(month) - 1;
  return `${monthNames[monthIndex] ?? month} ${year}`;
}

export function ExperienceSection({
  experiences,
  isLoading,
}: ExperienceSectionProps): React.JSX.Element {
  return (
    <AnimatedSection id={SECTION_IDS.EXPERIENCE} className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Experience"
          title="Career journey"
          description="Hands-on full-stack delivery — with room to grow on deployments alongside stronger product and API work."
        />

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div
              className="absolute top-0 bottom-0 left-6 w-px bg-border md:left-1/2 md:-translate-x-px"
              aria-hidden="true"
            />
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

interface ExperienceItemProps {
  readonly experience: Experience;
  readonly isLeft: boolean;
}

function ExperienceItem({ experience, isLeft }: ExperienceItemProps): React.JSX.Element {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        'relative mb-12 flex flex-col md:w-1/2',
        isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12',
      )}
    >
      <div
        className={cn(
          'absolute top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background',
          isLeft ? 'right-0 translate-x-1/2 md:right-0' : 'left-0 -translate-x-1/2 md:left-0',
          'md:left-auto md:right-auto md:translate-x-0',
          isLeft ? 'md:-right-6' : 'md:-left-6',
        )}
        aria-hidden="true"
      >
        <Briefcase className="h-5 w-5 text-accent" />
      </div>

      <div className="glass ml-16 rounded-2xl p-6 md:ml-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {experience.current && <Badge variant="accent">Current</Badge>}
          <span className="font-mono text-xs text-muted-foreground">
            {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{experience.role}</h3>
        <p className="text-sm text-accent">
          {experience.company} · {experience.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {experience.description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {experience.achievements.map((achievement) => (
            <li key={achievement} className="text-sm text-muted-foreground">
              • {achievement}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
