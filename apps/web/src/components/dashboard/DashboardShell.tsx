import { motion } from 'framer-motion';
import { Bell, ChevronLeft, LogOut, Menu, Search, Settings, X } from 'lucide-react';
import { useState } from 'react';
import { ExperienceModeSwitch } from '@/components/experience/ExperienceModeSwitch';
import { Button } from '@/components/ui/Button';
import { DASHBOARD_TABS, type DashboardTabId } from '@/lib/dashboard-tabs';
import { useAuthStore } from '@/stores/auth-store';
import { useDashboardTabStore } from '@/stores/use-dashboard-tab-store';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  readonly children: React.ReactNode;
  readonly profileName?: string;
}

type DashboardActionPanel = 'notifications' | 'settings' | null;

interface NotificationItem {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly time: string;
  readonly status: 'info' | 'success' | 'warning';
}

const NOTIFICATION_ITEMS: readonly NotificationItem[] = [
  {
    id: 'deploy-health',
    title: 'Portfolio API healthy',
    detail: 'All monitored endpoints are responding within expected latency.',
    time: '4m ago',
    status: 'success',
  },
  {
    id: 'github-sync',
    title: 'GitHub metrics synced',
    detail: 'Repository and language analytics were refreshed successfully.',
    time: '18m ago',
    status: 'info',
  },
  {
    id: 'web-vitals',
    title: 'Bundle size watch',
    detail: 'Production bundle is above the preferred threshold. Consider code splitting.',
    time: 'Today',
    status: 'warning',
  },
] as const;

export function DashboardShell({
  children,
  profileName = 'Operations',
}: DashboardShellProps): React.JSX.Element {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<DashboardActionPanel>(null);
  const { isDark, toggleTheme } = useTheme();
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const searchQuery = useDashboardTabStore((state) => state.searchQuery);
  const setSearchQuery = useDashboardTabStore((state) => state.setSearchQuery);
  const authUser = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const workspaceTitle = authUser?.name ?? profileName;

  const handleTabSelect = (tabId: DashboardTabId): void => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
    setActivePanel(null);
  };

  const handlePanelToggle = (panel: Exclude<DashboardActionPanel, null>): void => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:static',
            isSidebarCollapsed ? 'w-[72px]' : 'w-[232px]',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
            {!isSidebarCollapsed && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Portfolio OS
                </p>
                <p className="text-sm font-semibold">{workspaceTitle}</p>
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

          <nav className="flex-1 space-y-0.5 overflow-y-auto p-2.5" aria-label="Dashboard navigation">
            {DASHBOARD_TABS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabSelect(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
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
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
              {!isSidebarCollapsed && authUser ? (
                <>
                  <p className="text-xs text-zinc-500">Signed in as</p>
                  <p className="text-sm font-medium">{authUser.name}</p>
                  <p className="mt-0.5 text-xs text-indigo-600 dark:text-indigo-300">{authUser.role}</p>
                </>
              ) : null}
              <Button
                variant="ghost"
                size={isSidebarCollapsed ? 'icon' : 'sm'}
                className={cn('mt-2 w-full', isSidebarCollapsed && 'mt-0')}
                onClick={() => clearSession()}
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
                {!isSidebarCollapsed ? 'Sign out' : null}
              </Button>
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
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 sm:px-6">
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
              <label className="hidden min-w-0 max-w-xl flex-1 items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-700 dark:bg-zinc-800 sm:flex">
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

            <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
              <ExperienceModeSwitch variant="compact" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePanelToggle('notifications')}
                aria-label="Notifications"
                aria-expanded={activePanel === 'notifications'}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePanelToggle('settings')}
                aria-label="Settings"
                aria-expanded={activePanel === 'settings'}
              >
                <Settings className="h-4 w-4" />
              </Button>
              {activePanel && (
                <DashboardActionPopover
                  activePanel={activePanel}
                  activeTab={activeTab}
                  isDark={isDark}
                  isSidebarCollapsed={isSidebarCollapsed}
                  searchQuery={searchQuery}
                  onClose={() => setActivePanel(null)}
                  onToggleTheme={toggleTheme}
                  onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
                  onClearSearch={() => setSearchQuery('')}
                />
              )}
            </div>
          </header>

          <motion.main
            layout
            className="mx-auto w-full max-w-[1440px] flex-1 overflow-x-hidden p-4 sm:p-6"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
}

interface DashboardActionPopoverProps {
  readonly activePanel: Exclude<DashboardActionPanel, null>;
  readonly activeTab: DashboardTabId;
  readonly isDark: boolean;
  readonly isSidebarCollapsed: boolean;
  readonly searchQuery: string;
  readonly onClose: () => void;
  readonly onToggleTheme: () => void;
  readonly onToggleSidebar: () => void;
  readonly onClearSearch: () => void;
}

function DashboardActionPopover({
  activePanel,
  activeTab,
  isDark,
  isSidebarCollapsed,
  searchQuery,
  onClose,
  onToggleTheme,
  onToggleSidebar,
  onClearSearch,
}: DashboardActionPopoverProps): React.JSX.Element {
  const title = activePanel === 'notifications' ? 'Notifications' : 'Settings';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className="absolute top-11 right-0 z-50 w-[min(calc(100vw-2rem),380px)] overflow-hidden rounded-md border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      role="dialog"
      aria-label={title}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-sm font-semibold">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label={`Close ${title.toLowerCase()}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {activePanel === 'notifications' ? (
        <NotificationsPanel />
      ) : (
        <SettingsPanel
          activeTab={activeTab}
          isDark={isDark}
          isSidebarCollapsed={isSidebarCollapsed}
          searchQuery={searchQuery}
          onToggleTheme={onToggleTheme}
          onToggleSidebar={onToggleSidebar}
          onClearSearch={onClearSearch}
        />
      )}
    </motion.div>
  );
}

function NotificationsPanel(): React.JSX.Element {
  return (
    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {NOTIFICATION_ITEMS.map((item) => (
        <div key={item.id} className="flex gap-3 px-4 py-3">
          <span
            className={cn(
              'mt-1 h-2 w-2 shrink-0 rounded-full',
              item.status === 'success' && 'bg-emerald-500',
              item.status === 'info' && 'bg-indigo-500',
              item.status === 'warning' && 'bg-amber-500',
            )}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{item.title}</p>
              <span className="shrink-0 font-mono text-[10px] text-zinc-500">
                {item.time}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SettingsPanelProps {
  readonly activeTab: DashboardTabId;
  readonly isDark: boolean;
  readonly isSidebarCollapsed: boolean;
  readonly searchQuery: string;
  readonly onToggleTheme: () => void;
  readonly onToggleSidebar: () => void;
  readonly onClearSearch: () => void;
}

function SettingsPanel({
  activeTab,
  isDark,
  isSidebarCollapsed,
  searchQuery,
  onToggleTheme,
  onToggleSidebar,
  onClearSearch,
}: SettingsPanelProps): React.JSX.Element {
  const activeTabLabel =
    DASHBOARD_TABS.find((item) => item.id === activeTab)?.label ?? 'Overview';

  return (
    <div className="p-4">
      <div className="space-y-3">
        <SettingsRow
          label="Theme"
          value={isDark ? 'Dark' : 'Light'}
          actionLabel={`Switch to ${isDark ? 'light' : 'dark'}`}
          onClick={onToggleTheme}
        />
        <SettingsRow
          label="Sidebar"
          value={isSidebarCollapsed ? 'Collapsed' : 'Expanded'}
          actionLabel={isSidebarCollapsed ? 'Expand' : 'Collapse'}
          onClick={onToggleSidebar}
        />
        <SettingsRow
          label="Search"
          value={searchQuery ? `"${searchQuery}"` : 'No active filter'}
          actionLabel="Clear"
          onClick={onClearSearch}
          disabled={!searchQuery}
        />
      </div>

      <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
        <p className="text-xs font-medium text-zinc-500">Current section</p>
        <p className="mt-1 text-sm font-semibold">{activeTabLabel}</p>
        <p className="mt-1 text-xs text-zinc-500">
          Settings apply to the enterprise dashboard workspace.
        </p>
      </div>
    </div>
  );
}

interface SettingsRowProps {
  readonly label: string;
  readonly value: string;
  readonly actionLabel: string;
  readonly onClick: () => void;
  readonly disabled?: boolean;
}

function SettingsRow({
  label,
  value,
  actionLabel,
  onClick,
  disabled = false,
}: SettingsRowProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-zinc-500">{value}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {actionLabel}
      </button>
    </div>
  );
}
