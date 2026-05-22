import type { PortfolioContent } from '@portfolio/shared';
import { Save, ShieldAlert } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { fetchAuthApi, putAuthApi } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import { PortfolioAdminCertificationsSection } from './sections/portfolio-admin-certifications-section';
import { PortfolioAdminExperienceSection } from './sections/portfolio-admin-experience-section';
import { PortfolioAdminLearningSection } from './sections/portfolio-admin-learning-section';
import { PortfolioAdminProfileSection } from './sections/portfolio-admin-profile-section';
import { PortfolioAdminProjectsSection } from './sections/portfolio-admin-projects-section';
import { PortfolioAdminSkillsSection } from './sections/portfolio-admin-skills-section';

type AdminTab =
  | 'profile'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'certifications'
  | 'learning';

const ADMIN_TABS: readonly { id: AdminTab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'learning', label: 'Learning' },
] as const;

interface PortfolioAdminEditorProps {
  readonly variant?: 'standalone' | 'enterprise';
}

export function PortfolioAdminEditor({
  variant = 'enterprise',
}: PortfolioAdminEditorProps): React.JSX.Element {
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
      setStatusMessage('Saved. Refresh the public site to see updates.');
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
  const sectionProps = {
    content,
    isReadOnly,
    canEditStructure: canEditPortfolio,
    variant,
    onChange: setContent,
  };

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
            Signed in as <strong>{user?.role ?? 'user'}</strong> — read-only. Use the tabs below to
            preview each section.
          </p>
        </div>
      ) : (
        <p className={cn('text-sm', isEnterprise ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-400')}>
          Each tab covers one part of the portfolio. Edit variable names and values, then save once.
        </p>
      )}

      <div
        className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800"
        role="tablist"
        aria-label="Portfolio content sections"
      >
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? isEnterprise
                  ? 'bg-indigo-600 text-white'
                  : 'bg-violet-600 text-white'
                : isEnterprise
                  ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300'
                  : 'bg-zinc-800 text-zinc-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activeTab === 'profile' ? <PortfolioAdminProfileSection {...sectionProps} /> : null}
        {activeTab === 'skills' ? <PortfolioAdminSkillsSection {...sectionProps} /> : null}
        {activeTab === 'projects' ? <PortfolioAdminProjectsSection {...sectionProps} /> : null}
        {activeTab === 'experience' ? <PortfolioAdminExperienceSection {...sectionProps} /> : null}
        {activeTab === 'certifications' ? (
          <PortfolioAdminCertificationsSection {...sectionProps} />
        ) : null}
        {activeTab === 'learning' ? <PortfolioAdminLearningSection {...sectionProps} /> : null}
      </div>

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
