import type {
  Certification,
  Experience,
  GitHubStats,
  PortfolioContent,
  Project,
} from '@portfolio/shared';
import { ArrowUpRight, CheckCircle, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { DashboardMetricCard } from '@/components/dashboard/DashboardMetricCard';
import { DashboardPageHeader } from '@/components/dashboard/DashboardPageHeader';
import { ProjectKanbanBoard } from '@/components/dashboard/ProjectKanbanBoard';
import { ProjectOperationsTable } from '@/components/dashboard/ProjectOperationsTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Skeleton } from '@/components/ui/Skeleton';
import { useContactForm } from '@/hooks/use-contact-form';
import { buildDashboardData } from '@/lib/dashboard-data';
import { OBSERVABILITY_DEMO_PATH, isObservabilityProject } from '@/lib/project-demo-links';
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

function EnterpriseCard({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Card className="overflow-hidden rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export function DashboardOverviewPanel({
  portfolio,
  githubStats,
  isLoading,
}: DashboardPanelsProps): React.JSX.Element {
  const dashboardData = buildDashboardData({ portfolio, githubStats });
  const profile = portfolio?.profile;

  return (
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="overview"
        description={
          profile
            ? `${profile.title} dashboard view for portfolio, projects, skills, experience, and platform signals.`
            : 'Operational summary for portfolio content, delivery, and engineering signals.'
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardData.metrics.slice(0, 4).map((metric) => (
          <DashboardMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProjectOperationsTable rows={dashboardData.projectRows.slice(0, 6)} />
        </div>
        <ActivityFeed items={dashboardData.activity.slice(0, 4)} />
      </div>

      <DashboardCharts githubStats={githubStats} isLoading={isLoading} />
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="profile"
        description="Professional profile record with the same narrative as the creative portfolio."
      />

      <EnterpriseCard title="Profile Details">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              ['Name', profile.name],
              ['Title', profile.title],
              ['Location', profile.location],
              ['Email', profile.email],
              ['Focus', profile.bio],
            ].map(([label, value]) => (
              <tr key={label}>
                <th className="w-40 bg-zinc-50 px-4 py-3 text-xs font-medium text-zinc-500 dark:bg-zinc-950/50">
                  {label}
                </th>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </EnterpriseCard>

      <EnterpriseCard title="About Narrative">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <tr key={paragraph.slice(0, 40)}>
                <td className="w-24 px-4 py-3 font-mono text-xs text-zinc-500">
                  P{index + 1}
                </td>
                <td className="px-4 py-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {paragraph}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </EnterpriseCard>
    </div>
  );
}

export function DashboardProcessPanel(_props: DashboardPanelsProps): React.JSX.Element {
  return (
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="process"
        description="Operating model shown as workflow records instead of marketing cards."
      />

      <EnterpriseCard title="Workflow Stages">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
            <tr>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Operating Behavior</th>
              <th className="px-4 py-3 font-medium">Signal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {WORKFLOW_ITEMS.map((item, index) => (
              <tr key={item.title}>
                <td className="px-4 py-3 font-medium">0{index + 1}. {item.title}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{item.description}</td>
                <td className="px-4 py-3 text-xs text-indigo-600 dark:text-indigo-300">{item.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </EnterpriseCard>

      <EnterpriseCard title="Differentiators">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {WORKFLOW_CALLOUTS.map((callout) => (
              <tr key={callout}>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{callout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </EnterpriseCard>
    </div>
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="skills"
        description="Full skill inventory as a capability matrix."
      />

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <EnterpriseCard title="Capability Matrix">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
              <tr>
                <th className="px-4 py-3 font-medium">Domain</th>
                <th className="px-4 py-3 font-medium">Skill</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Experience</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {categories.flatMap((category) =>
                category.skills.map((skill) => (
                  <tr key={`${category.id}-${skill.name}`}>
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{skill.name}</td>
                    <td className="px-4 py-3 min-w-[220px]">
                      <ProgressBar value={skill.level} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                      {skill.years ? `${skill.years} yrs` : 'Project-based'}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </EnterpriseCard>
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="projects"
        description="Flagship observability project shown as an operating record with architecture decisions and a live demo."
      />

      <ProjectOperationsTable rows={filteredRows} />

      <EnterpriseCard title="Architecture Decisions">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
            <tr>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Decision</th>
              <th className="px-4 py-3 font-medium">Scale Consideration</th>
              <th className="px-4 py-3 font-medium">Record</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {projects.map((project) => (
              <ProjectDecisionRow key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </EnterpriseCard>

      <ProjectKanbanBoard cards={filteredKanban.length > 0 ? filteredKanban : dashboardData.kanbanCards} />
    </div>
  );
}

function ProjectDecisionRow({ project }: { readonly project: Project }): React.JSX.Element {
  const isObservability = isObservabilityProject(project.slug);

  return (
    <tr>
      <td className="px-4 py-3">
        <p className="font-medium">{project.title}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <Badge variant="accent">{project.category}</Badge>
        </div>
      </td>
      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
        {project.architecture[0] ?? project.description}
      </td>
      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
        {project.scalability[0] ?? project.metrics[0]?.value}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {isObservability ? (
            <Button variant="accent" size="sm" asChild magnetic={false}>
              <Link to={OBSERVABILITY_DEMO_PATH}>
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
          <Link to={`/projects/${project.slug}`}>
            <Button variant="outline" size="sm">
              Open
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </td>
    </tr>
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="experience"
        description="Career timeline formatted as employment records."
      />

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <Card className="overflow-hidden rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/60">
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Primary Highlight</th>
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
        {experience.achievements[0] ?? experience.description}
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="growth"
        description="Certification and learning progress shown as professional development records."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <EnterpriseCard title="Certifications">
          {isLoading
            ? <Skeleton className="m-4 h-28" />
            : (
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {certifications.map((cert) => (
                    <CertificationRow key={cert.id} cert={cert} label={STATUS_LABEL[cert.status]} />
                  ))}
                </tbody>
              </table>
            )}
        </EnterpriseCard>

        <EnterpriseCard title="Learning Paths">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {learningPaths.map((path) => (
                <tr key={path.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{path.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{path.description}</p>
                  </td>
                  <td className="w-48 px-4 py-3">
                    <ProgressBar value={path.progress} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </EnterpriseCard>
      </div>
    </div>
  );
}

function CertificationRow({
  cert,
  label,
}: {
  readonly cert: Certification;
  readonly label: string;
}): React.JSX.Element {
  return (
    <tr>
      <td className="px-4 py-3">
        <p className="font-medium">{cert.name}</p>
        <p className="mt-1 text-xs text-zinc-500">{cert.issuer}</p>
      </td>
      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{cert.description}</td>
      <td className="px-4 py-3">
        <Badge variant="accent">{label}</Badge>
      </td>
    </tr>
  );
}

export function DashboardAnalyticsPanel({
  githubStats,
  isLoading,
  portfolio,
}: DashboardPanelsProps): React.JSX.Element {
  const dashboardData = buildDashboardData({ portfolio, githubStats });

  return (
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="analytics"
        description="GitHub and coding signals displayed as analytics records."
      />

      {githubStats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Repositories', value: githubStats.publicRepos },
            { label: 'Stars', value: githubStats.totalStars },
            { label: 'Followers', value: githubStats.followers },
            { label: 'Commits', value: githubStats.totalCommits.toLocaleString() },
          ].map((stat) => (
            <Card key={stat.label} className="rounded-md border-zinc-200 bg-white text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
        <EnterpriseCard title="Top Repositories">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-950/60">
              <tr>
                <th className="px-4 py-3 font-medium">Repository</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Language</th>
                <th className="px-4 py-3 font-medium">Stars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {githubStats.topRepositories.map((repo) => (
                <tr key={repo.name}>
                  <td className="px-4 py-3 font-mono text-indigo-600">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{repo.description}</td>
                  <td className="px-4 py-3 text-xs">{repo.language}</td>
                  <td className="px-4 py-3 font-mono text-xs">{repo.stars}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </EnterpriseCard>
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
    <div className="space-y-5">
      <DashboardPageHeader
        tabId="contact"
        description="CRM-style contact record and outreach form."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
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

        <Card className="rounded-md border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-3">
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
