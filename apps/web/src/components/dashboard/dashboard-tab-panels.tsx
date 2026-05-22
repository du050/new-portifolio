import type {
  Certification,
  Experience,
  GitHubStats,
  LearningPath,
  PortfolioContent,
  Project,
  SkillCategory,
} from '@portfolio/shared';
import {
  ArrowUpRight,
  CheckCircle,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { MonitoringPanel } from '@/components/dashboard/MonitoringPanel';
import { ProjectKanbanBoard } from '@/components/dashboard/ProjectKanbanBoard';
import { ProjectOperationsTable } from '@/components/dashboard/ProjectOperationsTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Skeleton } from '@/components/ui/Skeleton';
import { useContactForm } from '@/hooks/use-contact-form';
import { buildDashboardData } from '@/lib/dashboard-data';
import { WORKFLOW_CALLOUTS, WORKFLOW_ITEMS } from '@/lib/workflow-content';
import { cn } from '@/lib/utils';

interface DashboardPanelsProps {
  readonly portfolio: PortfolioContent | null;
  readonly githubStats: GitHubStats | null;
  readonly isLoading: boolean;
  readonly searchQuery: string;
}

interface ContactFormState {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

const INITIAL_CONTACT_FORM: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function matchesSearch(text: string, query: string): boolean {
  if (!query.trim()) {
    return true;
  }
  return text.toLowerCase().includes(query.toLowerCase());
}

function formatExperienceDate(date: string | null): string {
  if (!date) {
    return 'Present';
  }
  const [year, month] = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(month) - 1] ?? month} ${year}`;
}

export function DashboardOverviewPanel({
  portfolio,
  githubStats,
  isLoading,
}: DashboardPanelsProps): React.JSX.Element {
  const dashboardData = buildDashboardData({ portfolio, githubStats });
  const profile = portfolio?.profile;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="overview"
        description={
          profile
            ? `${profile.headline} — ${profile.subheadline}`
            : 'Operations summary across delivery, platform health, and engineering signals.'
        }
      />

      {profile && (
        <Card className="border-indigo-200/60 bg-gradient-to-r from-indigo-50 to-white dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-zinc-900">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">Profile record</p>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">{profile.title}</p>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{profile.bio}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{profile.location}</Badge>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} download>
                  <Button variant="outline" size="sm">
                    Resume
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardData.metrics.map((metric) => (
          <DashboardMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <DashboardCharts githubStats={githubStats} isLoading={isLoading} />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProjectOperationsTable rows={dashboardData.projectRows.slice(0, 5)} />
        </div>
        <ActivityFeed items={dashboardData.activity.slice(0, 5)} />
      </div>

      <MonitoringPanel services={dashboardData.services} logs={dashboardData.logs.slice(0, 4)} />
    </div>
  );
}

export function DashboardProfilePanel({
  portfolio,
  isLoading,
}: DashboardPanelsProps): React.JSX.Element {
  const profile = portfolio?.profile;

  if (isLoading || !profile) {
    return (
      <div className="space-y-4">
        <DashboardPageHeader tabId="profile" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="profile"
        description="Same profile and about narrative as creative mode, presented as a personnel record."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/80 lg:col-span-1">
          <CardContent className="p-5">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 font-mono text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              {profile.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-indigo-600 dark:text-indigo-300">{profile.title}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </p>
            <a href={`mailto:${profile.email}`} className="mt-2 flex items-center gap-1.5 text-sm text-indigo-600">
              <Mail className="h-3.5 w-3.5" />
              {profile.email}
            </a>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: 'Signature', value: 'Craft + systems' },
                { label: 'Focus', value: 'Full-stack DevOps' },
                { label: 'Energy', value: 'Detail obsessed' },
                { label: 'Edge', value: 'UX-aware backend' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  <p className="text-[10px] text-zinc-500">{stat.label}</p>
                  <p className="text-xs font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">About narrative</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DashboardProcessPanel(_props: DashboardPanelsProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="process"
        description="Working style and product judgment — identical to the creative Process section."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {WORKFLOW_ITEMS.map((item, index) => (
          <Card key={item.title} className="border-border/80">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                  <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <span className="font-mono text-[10px] text-zinc-500">0{index + 1}</span>
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                {item.signal}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle className="text-sm">Differentiators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {WORKFLOW_CALLOUTS.map((callout) => (
            <p key={callout} className="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
              {callout}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SkillCategoryCard({ category }: { readonly category: SkillCategory }): React.JSX.Element {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {category.skills.map((skill) => (
          <ProgressBar key={skill.name} label={skill.name} value={skill.level} />
        ))}
      </CardContent>
    </Card>
  );
}

export function DashboardSkillsPanel({
  portfolio,
  isLoading,
  searchQuery,
}: DashboardPanelsProps): React.JSX.Element {
  const categories =
    portfolio?.skillCategories.filter((category) =>
      matchesSearch(
        `${category.name} ${category.skills.map((skill) => skill.name).join(' ')}`,
        searchQuery,
      ),
    ) ?? [];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="skills"
        description="Full skill inventory from creative mode, organized by capability domain."
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardProjectsPanel({
  portfolio,
  searchQuery,
}: DashboardPanelsProps): React.JSX.Element {
  const projects =
    portfolio?.projects.filter((project) =>
      matchesSearch(
        `${project.title} ${project.description} ${project.techStack.join(' ')}`,
        searchQuery,
      ),
    ) ?? [];

  const dashboardData = buildDashboardData({ portfolio, githubStats: null });
  const filteredRows = dashboardData.projectRows.filter((row) =>
    projects.some((project) => project.id === row.id),
  );
  const filteredKanban = dashboardData.kanbanCards.filter((card) =>
    projects.some((project) => project.id === card.id),
  );

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="projects"
        description="All portfolio projects with operations table, delivery board, and detail records."
      />

      <ProjectOperationsTable rows={filteredRows} />

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectDetailCard key={project.id} project={project} />
        ))}
      </div>

      <ProjectKanbanBoard cards={filteredKanban.length > 0 ? filteredKanban : dashboardData.kanbanCards} />
    </div>
  );
}

function ProjectDetailCard({ project }: { readonly project: Project }): React.JSX.Element {
  return (
    <Card className="border-border/80">
      <CardContent className="p-5">
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="accent">{project.category}</Badge>
          {project.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        <h3 className="font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-sm font-bold">{metric.value}</p>
              <p className="text-[10px] text-zinc-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/projects/${project.slug}`}>
            <Button variant="outline" size="sm">
              Open record
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardExperiencePanel({
  portfolio,
  isLoading,
  searchQuery,
}: DashboardPanelsProps): React.JSX.Element {
  const experiences =
    portfolio?.experiences.filter((experience) =>
      matchesSearch(
        `${experience.company} ${experience.role} ${experience.technologies.join(' ')}`,
        searchQuery,
      ),
    ) ?? [];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="experience"
        description="Career timeline from creative mode, formatted as enterprise experience records."
      />

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <Card className="border-border/80 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800">
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Highlights</th>
                <th className="px-4 py-3">Stack</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <ExperienceTableRow key={experience.id} experience={experience} />
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function ExperienceTableRow({
  experience,
}: {
  readonly experience: Experience;
}): React.JSX.Element {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800">
      <td className="px-4 py-4">
        <p className="font-medium">{experience.role}</p>
        {experience.current && (
          <span className="mt-1 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-700 dark:text-emerald-300">
            Current
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
        {experience.company}
        <br />
        <span className="text-xs">{experience.location}</span>
      </td>
      <td className="px-4 py-4 font-mono text-xs">
        {formatExperienceDate(experience.startDate)} — {formatExperienceDate(experience.endDate)}
      </td>
      <td className="px-4 py-4 max-w-xs text-xs text-zinc-600 dark:text-zinc-400">
        <ul className="space-y-1">
          {experience.achievements.slice(0, 2).map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1">
          {experience.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </td>
    </tr>
  );
}

export function DashboardGrowthPanel({
  portfolio,
  isLoading,
}: DashboardPanelsProps): React.JSX.Element {
  const certifications = portfolio?.certifications ?? [];
  const learningPaths = portfolio?.learningPaths ?? [];

  const STATUS_LABEL: Record<Certification['status'], string> = {
    completed: 'Completed',
    in_progress: 'In Progress',
    planned: 'Planned',
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="growth"
        description="Certifications and learning paths — same content as the creative Growth section."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Certifications</h2>
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => <Skeleton key={index} className="h-28" />)
            : certifications.map((cert) => (
                <Card key={cert.id} className="border-border/80">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium">{cert.name}</h3>
                      <Badge variant="accent">{STATUS_LABEL[cert.status]}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">{cert.issuer}</p>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Learning paths</h2>
          {learningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningPathCard({ path }: { readonly path: LearningPath }): React.JSX.Element {
  return (
    <Card className="border-border/80">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-indigo-600" />
          <h3 className="font-medium">{path.title}</h3>
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{path.description}</p>
        <div className="mt-3">
          <ProgressBar value={path.progress} label="Progress" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {path.topics.map((topic) => (
            <Badge key={topic} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardAnalyticsPanel({
  githubStats,
  isLoading,
  portfolio,
}: DashboardPanelsProps): React.JSX.Element {
  const dashboardData = buildDashboardData({ portfolio, githubStats });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="analytics"
        description="GitHub activity, language distribution, and repository signals from creative mode."
      />

      {githubStats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Repositories', value: githubStats.publicRepos },
            { label: 'Stars', value: githubStats.totalStars },
            { label: 'Followers', value: githubStats.followers },
            { label: 'Commits', value: githubStats.totalCommits.toLocaleString() },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/80 text-center">
              <CardContent className="pt-5">
                <p className="font-mono text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <DashboardCharts githubStats={githubStats} isLoading={isLoading} />

      {githubStats && githubStats.topRepositories.length > 0 && (
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-sm">Top repositories</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {githubStats.topRepositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
              >
                <p className="font-mono text-sm font-semibold text-indigo-600">{repo.name}</p>
                <p className="mt-1 text-xs text-zinc-500">{repo.description}</p>
                <p className="mt-2 text-[10px] text-zinc-400">
                  {repo.language} · {repo.stars} stars
                </p>
              </a>
            ))}
          </CardContent>
        </Card>
      )}

      <ActivityFeed items={dashboardData.activity.filter((item) => item.type === 'commit')} />
    </div>
  );
}

export function DashboardContactPanel({
  portfolio,
}: DashboardPanelsProps): React.JSX.Element {
  const profile = portfolio?.profile;
  const [form, setForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM);
  const { isSubmitting, isSuccess, hasError, errorMessage, submitContact, resetForm } =
    useContactForm();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await submitContact(form);
    if (!hasError) {
      setForm(INITIAL_CONTACT_FORM);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        tabId="contact"
        description="Same contact channels and form as creative mode, inside a CRM-style outreach panel."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/80 lg:col-span-2">
          <CardContent className="space-y-4 p-5">
            <h2 className="font-semibold">Reach out</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Open to engineering roles, consulting, and infrastructure-heavy product work.
            </p>
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-indigo-600"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            )}
            <div className="flex gap-2">
              {profile?.socialLinks.map((link) => {
                const Icon = link.icon === 'github' ? Github : Linkedin;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700"
                    aria-label={link.platform}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 lg:col-span-3">
          <CardContent className="p-5">
            {isSuccess ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
                <p className="mt-3 font-semibold">Message sent</p>
                <Button className="mt-4" variant="outline" onClick={resetForm}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <DashboardInput
                    id="dash-name"
                    label="Name"
                    value={form.name}
                    onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                    required
                  />
                  <DashboardInput
                    id="dash-email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                    required
                  />
                </div>
                <DashboardInput
                  id="dash-subject"
                  label="Subject"
                  value={form.subject}
                  onChange={(value) => setForm((current) => ({ ...current, subject: value }))}
                  required
                />
                <div>
                  <label htmlFor="dash-message" className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="dash-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, message: event.target.value }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>
                {hasError && errorMessage && (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const INPUT_CLASS = cn(
  'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500',
);

interface DashboardInputProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly type?: string;
  readonly required?: boolean;
}

function DashboardInput({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: DashboardInputProps): React.JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT_CLASS}
      />
    </div>
  );
}
