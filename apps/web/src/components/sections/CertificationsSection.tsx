import { motion } from 'framer-motion';
import type { Certification, LearningPath } from '@portfolio/shared';
import { Award, BookOpen } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
interface CertificationsSectionProps {
  readonly certifications: readonly Certification[];
  readonly learningPaths: readonly LearningPath[];
  readonly isLoading: boolean;
}

const STATUS_LABELS: Record<Certification['status'], string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  planned: 'Planned',
};

const STATUS_VARIANT: Record<Certification['status'], 'default' | 'accent' | 'outline'> = {
  completed: 'accent',
  in_progress: 'accent',
  planned: 'outline',
};

export function CertificationsSection({
  certifications,
  learningPaths,
  isLoading,
}: CertificationsSectionProps): React.JSX.Element {
  return (
    <AnimatedSection id={SECTION_IDS.CERTIFICATIONS}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Growth"
          title="Certifications & continuous learning"
          description="Formal learning alongside day-to-day full-stack practice — cloud and containers at a fundamentals level."
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-40" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Award className="h-4 w-4" aria-hidden="true" />
                Certifications
              </h3>
              {certifications.map((cert) => (
                <motion.div key={cert.id} variants={fadeInUp}>
                  <Card glass>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{cert.name}</CardTitle>
                        <Badge variant={STATUS_VARIANT[cert.status]}>
                          {STATUS_LABELS[cert.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Learning Paths
              </h3>
              {learningPaths.map((path) => (
                <motion.div key={path.id} variants={fadeInUp}>
                  <Card glass>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{path.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ProgressBar value={path.progress} label="Progress" />
                      <div className="flex flex-wrap gap-1.5">
                        {path.topics.map((topic) => (
                          <Badge key={topic} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
