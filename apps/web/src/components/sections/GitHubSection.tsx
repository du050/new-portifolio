import { motion } from 'framer-motion';
import type { GitHubStats } from '@portfolio/shared';
import { GitBranch, Star, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';

interface GitHubSectionProps {
  readonly stats: GitHubStats | null;
  readonly isLoading: boolean;
}

export function GitHubSection({
  stats,
  isLoading,
}: GitHubSectionProps): React.JSX.Element {
  const commitData = stats?.commitActivity.slice(-26) ?? [];

  return (
    <AnimatedSection id={SECTION_IDS.GITHUB} className="bg-gradient-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="GitHub"
          title="Engineering rhythm in public"
          description="Contribution data, repository signals, and language distribution presented as a compact studio dashboard."
          align="center"
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-32" />
            ))}
          </div>
        ) : stats ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {[
                { label: 'Repositories', value: stats.publicRepos, icon: GitBranch },
                { label: 'Stars', value: stats.totalStars, icon: Star },
                { label: 'Followers', value: stats.followers, icon: Users },
                { label: 'Commits', value: stats.totalCommits.toLocaleString(), icon: GitBranch },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <Card glass className="text-center transition-transform duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <stat.icon
                        className="mx-auto mb-2 h-5 w-5 text-accent"
                        aria-hidden="true"
                      />
                      <p className="font-mono text-2xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card glass className="aurora-card">
                <CardHeader>
                  <CardTitle className="text-base">Commit Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={commitData}>
                      <defs>
                        <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{
                          background: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-accent)"
                        fill="url(#commitGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card glass className="silk-border">
                <CardHeader>
                  <CardTitle className="text-base">Language Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[...stats.languages]}
                        dataKey="percentage"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {stats.languages.map((lang) => (
                          <Cell key={lang.name} fill={lang.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex flex-wrap justify-center gap-3">
                    {stats.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-1.5 text-xs">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                          aria-hidden="true"
                        />
                        {lang.name} {lang.percentage}%
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {stats.topRepositories.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {stats.topRepositories.map((repo) => (
                  <motion.div key={repo.name} variants={fadeInUp}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card glass className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-mono text-sm font-semibold text-accent">
                                {repo.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {repo.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3" aria-hidden="true" />
                              {repo.stars}
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{repo.language}</p>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </AnimatedSection>
  );
}
