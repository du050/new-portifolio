import type { PortfolioContent } from '@portfolio/shared';
import { Save, ShieldAlert } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { fetchAuthApi, putAuthApi } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import { AdminField } from './admin-field';

interface PortfolioAdminEditorProps {
  readonly variant?: 'standalone' | 'enterprise';
}

export function PortfolioAdminEditor({
  variant = 'enterprise',
}: PortfolioAdminEditorProps): React.JSX.Element {

type AdminTab = 'profile' | 'skills' | 'projects' | 'experience' | 'certifications' | 'learning';

const ADMIN_TABS: readonly { id: AdminTab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'learning', label: 'Learning' },
] as const;

  const isEnterprise = variant === 'enterprise';
  const canEditPortfolio = useAuthStore((state) => state.canEditPortfolio);
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadContent = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);
    try {
      const portfolio = await fetchAuthApi<PortfolioContent>('/admin/portfolio');
      setContent(structuredClone(portfolio));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const handleSave = async (): Promise<void> => {
    if (!content || !canEditPortfolio) {
      return;
    }
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const updated = await putAuthApi<PortfolioContent, { content: PortfolioContent }>(
        '/admin/portfolio',
        { content },
      );
      setContent(structuredClone(updated));
      setStatusMessage('Portfolio content saved. Public site will reflect changes on refresh.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Save failed';
      setStatusMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-zinc-400">Loading portfolio content…</p>;
  }

  if (hasError || !content) {
    return (
      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        Could not load admin portfolio data. Check API and database connection.
      </p>
    );
  }

  const isReadOnly = !canEditPortfolio;

  return (
    <div className="space-y-6">
      {isReadOnly ? (
        <div
          className={cn(
            'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
            isEnterprise
              ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-100',
          )}
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Signed in as <strong>{user?.role ?? 'user'}</strong> — view-only access. Standard and
            Admin roles can read this panel; only Super Admin can edit and save.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm transition-colors',
              activeTab === tab.id
                ? isEnterprise
                  ? 'bg-indigo-600 text-white'
                  : 'bg-violet-600 text-white'
                : isEnterprise
                  ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' ? (
        <section className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Name"
            value={content.profile.name}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, name: value } })
            }
          />
          <AdminField
            label="Title"
            value={content.profile.title}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, title: value } })
            }
          />
          <AdminField
            label="Headline"
            value={content.profile.headline}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, headline: value } })
            }
          />
          <AdminField
            label="Location"
            value={content.profile.location}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, location: value } })
            }
          />
          <AdminField
            label="Email"
            type="email"
            value={content.profile.email}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, email: value } })
            }
          />
          <AdminField
            label="Bio"
            multiline
            value={content.profile.bio}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(value) =>
              setContent({ ...content, profile: { ...content.profile, bio: value } })
            }
          />
        </section>
      ) : null}

      {activeTab === 'skills' ? (
        <section className="space-y-6">
          {content.skillCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className={cn(
                'rounded-xl border p-4',
                isEnterprise
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-zinc-800',
              )}
            >
              <h3
                className={cn(
                  'mb-3 font-medium',
                  isEnterprise ? 'text-zinc-900 dark:text-zinc-100' : 'text-white',
                )}
              >
                {category.name}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {category.skills.map((skill, skillIndex) => (
                  <AdminField
                    key={`${category.id}-${skill.name}`}
                    label={`${skill.name} level (%)`}
                    type="number"
                    value={skill.level}
                    isReadOnly={isReadOnly}
                    variant={variant}
                    onChange={(value) => {
                      const nextCategories = [...content.skillCategories];
                      const nextCategory = { ...category, skills: [...category.skills] };
                      nextCategory.skills[skillIndex] = {
                        ...skill,
                        level: Number(value) || 0,
                      };
                      nextCategories[categoryIndex] = nextCategory;
                      setContent({ ...content, skillCategories: nextCategories });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {activeTab === 'projects' ? (
        <section className="space-y-6">
          {content.projects.map((project, projectIndex) => (
            <div
              key={project.id}
              className={cn(
                'rounded-xl border p-4',
                isEnterprise
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-zinc-800',
              )}
            >
              <h3
                className={cn(
                  'mb-3 font-medium',
                  isEnterprise ? 'text-zinc-900 dark:text-zinc-100' : 'text-white',
                )}
              >
                {project.title}
              </h3>
              <AdminField
                label="Short description"
                multiline
                value={project.description}
                isReadOnly={isReadOnly}
                variant={variant}
                onChange={(value) => {
                  const nextProjects = [...content.projects];
                  nextProjects[projectIndex] = { ...project, description: value };
                  setContent({ ...content, projects: nextProjects });
                }}
              />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {project.metrics.map((metric, metricIndex) => (
                  <div key={`${project.id}-${metric.label}`} className="space-y-2">
                    <AdminField
                      label={`${metric.label} value`}
                      value={metric.value}
                      isReadOnly={isReadOnly}
                      onChange={(value) => {
                        const nextProjects = [...content.projects];
                        const nextMetrics = [...project.metrics];
                        nextMetrics[metricIndex] = { ...metric, value };
                        nextProjects[projectIndex] = { ...project, metrics: nextMetrics };
                        setContent({ ...content, projects: nextProjects });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {activeTab === 'experience' ? (
        <section className="space-y-6">
          {content.experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={cn(
                'rounded-xl border p-4',
                isEnterprise
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-zinc-800',
              )}
            >
              <h3
                className={cn(
                  'mb-3 font-medium',
                  isEnterprise ? 'text-zinc-900 dark:text-zinc-100' : 'text-white',
                )}
              >
                {experience.role} @ {experience.company}
              </h3>
              <AdminField
                label="Description"
                multiline
                value={experience.description}
                isReadOnly={isReadOnly}
                variant={variant}
                onChange={(value) => {
                  const next = [...content.experiences];
                  next[index] = { ...experience, description: value };
                  setContent({ ...content, experiences: next });
                }}
              />
            </div>
          ))}
        </section>
      ) : null}

      {activeTab === 'certifications' ? (
        <section className="space-y-6">
          {content.certifications.map((certification, index) => (
            <div
              key={certification.id}
              className={cn(
                'rounded-xl border p-4',
                isEnterprise
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-zinc-800',
              )}
            >
              <AdminField
                label="Name"
                value={certification.name}
                isReadOnly={isReadOnly}
                variant={variant}
                onChange={(value) => {
                  const next = [...content.certifications];
                  next[index] = { ...certification, name: value };
                  setContent({ ...content, certifications: next });
                }}
              />
              <div className="mt-3">
                <AdminField
                  label="Description"
                  multiline
                  value={certification.description}
                  isReadOnly={isReadOnly}
                  onChange={(value) => {
                    const next = [...content.certifications];
                    next[index] = { ...certification, description: value };
                    setContent({ ...content, certifications: next });
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {activeTab === 'learning' ? (
        <section className="space-y-4">
          {content.learningPaths.map((path, index) => (
            <div
              key={path.id}
              className={cn(
                'rounded-xl border p-4',
                isEnterprise
                  ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                  : 'border-zinc-800',
              )}
            >
              <h3
                className={cn(
                  'mb-3 font-medium',
                  isEnterprise ? 'text-zinc-900 dark:text-zinc-100' : 'text-white',
                )}
              >
                {path.title}
              </h3>
              <AdminField
                label="Progress (%)"
                type="number"
                value={path.progress}
                isReadOnly={isReadOnly}
                variant={variant}
                onChange={(value) => {
                  const next = [...content.learningPaths];
                  next[index] = { ...path, progress: Math.min(100, Math.max(0, Number(value) || 0)) };
                  setContent({ ...content, learningPaths: next });
                }}
              />
              <AdminField
                label="Description"
                multiline
                value={path.description}
                isReadOnly={isReadOnly}
                variant={variant}
                onChange={(value) => {
                  const next = [...content.learningPaths];
                  next[index] = { ...path, description: value };
                  setContent({ ...content, learningPaths: next });
                }}
              />
            </div>
          ))}
        </section>
      ) : null}

      <div
        className={cn(
          'flex flex-wrap items-center gap-4 border-t pt-4',
          isEnterprise ? 'border-zinc-200 dark:border-zinc-800' : 'border-zinc-800',
        )}
      >
        {canEditPortfolio ? (
          <Button variant="accent" onClick={() => void handleSave()} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving…' : 'Save changes'}
          </Button>
        ) : null}
        {statusMessage ? <p className="text-sm text-zinc-400">{statusMessage}</p> : null}
      </div>
    </div>
  );
}
