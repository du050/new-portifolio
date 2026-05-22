import { motion } from 'framer-motion';
import { Bell, ChevronLeft, Menu, Search, Settings } from 'lucide-react';
import { useState } from 'react';
import { ExperienceModeSwitch } from '@/components/experience/ExperienceModeSwitch';
import { Button } from '@/components/ui/Button';
import { DASHBOARD_TABS, type DashboardTabId } from '@/lib/dashboard-tabs';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  readonly children: React.ReactNode;
  readonly profileName?: string;
}

export function DashboardShell({
  children,
  profileName = 'Operations',
}: DashboardShellProps): React.JSX.Element {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const searchQuery = useDashboardTabStore((state) => state.searchQuery);
  const setSearchQuery = useDashboardTabStore((state) => state.setSearchQuery);

  const handleTabSelect = (tabId: DashboardTabId): void => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:static',
            isSidebarCollapsed ? 'w-[72px]' : 'w-64',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
            {!isSidebarCollapsed && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Workspace
                </p>
                <p className="text-sm font-semibold">{profileName}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft
                className={cn('h-4 w-4 transition-transform', isSidebarCollapsed && 'rotate-180')}
              />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Dashboard navigation">
            {DASHBOARD_TABS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabSelect(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {!isSidebarCollapsed && item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
            <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800/80">
              {!isSidebarCollapsed && (
                <>
                  <p className="text-xs text-zinc-500">Signed in as</p>
                  <p className="text-sm font-medium">{profileName}</p>
                </>
              )}
            </div>
          </div>
        </aside>

        {isMobileOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-800 sm:flex">
                <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search projects, skills, experience..."
                  className="w-full min-w-0 bg-transparent text-xs text-zinc-700 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
                  aria-label="Search dashboard content"
                />
              </label>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ExperienceModeSwitch variant="compact" />
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <motion.main
            layout
            className="flex-1 overflow-x-hidden p-4 sm:p-6"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}
