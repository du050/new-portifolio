import { motion } from 'framer-motion';
import type { SkillCategory } from '@portfolio/shared';
import {
  Activity,
  Box,
  Cloud,
  Database,
  GitBranch,
  Layout,
  Network,
  Server,
  Wrench,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  layout: Layout,
  server: Server,
  cloud: Cloud,
  'git-branch': GitBranch,
  database: Database,
  box: Box,
  workflow: GitBranch,
  network: Network,
  activity: Activity,
  wrench: Wrench,
};

interface SkillsSectionProps {
  readonly categories: readonly SkillCategory[];
  readonly isLoading: boolean;
}

export function SkillsSection({
  categories,
  isLoading,
}: SkillsSectionProps): React.JSX.Element {
  const topSkills = categories
    .flatMap((cat) => cat.skills.map((skill) => ({ ...skill, category: cat.name })))
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  const chartData = topSkills.map((skill) => ({
    name: skill.name,
    level: skill.level,
  }));

  return (
    <AnimatedSection id={SECTION_IDS.SKILLS} className="bg-gradient-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Skills"
          title="A polished toolkit for product and platform work"
          description="Categorized around outcomes: interfaces people trust, APIs teams can scale, and infrastructure that behaves predictably."
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48" />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-12 grid gap-6 lg:grid-cols-2">
              <Card glass className="aurora-card">
                <CardHeader>
                  <CardTitle className="text-base">Signal Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={90}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="level" fill="var(--color-accent)" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3"
              >
                {categories.slice(0, 4).map((category) => {
                  const Icon = ICON_MAP[category.icon] ?? Wrench;
                  const avgLevel = Math.round(
                    category.skills.reduce((sum, skill) => sum + skill.level, 0) /
                      category.skills.length,
                  );
                  return (
                    <motion.div key={category.id} variants={fadeInUp}>
                      <Card className="h-full silk-border bg-card/70">
                        <CardContent className="flex flex-col items-center justify-center pt-6 text-center">
                          <Icon className="mb-2 h-5 w-5 text-accent" aria-hidden="true" />
                          <p className="text-sm font-medium">{category.name}</p>
                          <p className="mt-1 font-mono text-2xl font-bold">{avgLevel}%</p>
                          <p className="text-xs text-muted-foreground">
                            {category.skills.length} skills
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories.map((category) => {
                const Icon = ICON_MAP[category.icon] ?? Wrench;
                return (
                  <motion.div key={category.id} variants={fadeInUp}>
                    <Card
                      glass
                      className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400/20 to-violet-400/20',
                            )}
                          >
                            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                          </div>
                          <CardTitle className="text-sm">{category.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {category.skills.map((skill) => (
                          <ProgressBar
                            key={skill.name}
                            label={skill.name}
                            value={skill.level}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </AnimatedSection>
  );
}
