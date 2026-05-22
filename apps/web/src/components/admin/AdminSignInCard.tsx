import { Lock, ShieldOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  DEMO_QUICK_LOGIN_ROLES,
  DEMO_ROLE_CREDENTIALS,
  SUPER_ADMIN_DEMO_LABEL,
  type DemoQuickLoginRole,
} from '@/lib/admin-demo-credentials';
import { performAdminLogin } from '@/lib/admin-auth';
import { cn } from '@/lib/utils';

interface AdminSignInCardProps {
  readonly variant?: 'standalone' | 'enterprise';
  readonly onSuccess?: () => void;
}

export function AdminSignInCard({
  variant = 'enterprise',
  onSuccess,
}: AdminSignInCardProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<DemoQuickLoginRole | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEnterprise = variant === 'enterprise';

  const handleLogin = async (loginEmail: string, loginPassword: string): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await performAdminLogin(loginEmail, loginPassword);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
      setLoadingRole(null);
    }
  };

  const handleQuickRole = async (role: DemoQuickLoginRole): Promise<void> => {
    const credentials = DEMO_ROLE_CREDENTIALS[role];
    setLoadingRole(role);
    setEmail(credentials.email);
    setPassword(credentials.password);
    await handleLogin(credentials.email, credentials.password);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div
      className={cn(
        'rounded-xl border p-6 shadow-sm',
        isEnterprise
          ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
          : 'border-white/10 bg-zinc-900/80 backdrop-blur',
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            isEnterprise
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
              : 'bg-violet-500/20 text-violet-300',
          )}
        >
          <Lock className="h-5 w-5" />
        </div>
        <div>
          <h2
            className={cn(
              'text-lg font-semibold',
              isEnterprise ? 'text-zinc-900 dark:text-zinc-100' : 'text-white',
            )}
          >
            Admin access
          </h2>
          <p className={cn('text-sm', isEnterprise ? 'text-zinc-500' : 'text-zinc-400')}>
            RBAC demo — Standard and Admin are read-only in this panel
          </p>
        </div>
      </div>

      <p className={cn('mb-3 text-xs font-medium uppercase tracking-wide', isEnterprise ? 'text-zinc-500' : 'text-zinc-400')}>
        Quick sign-in (showcase roles)
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {DEMO_QUICK_LOGIN_ROLES.map((role) => {
          const credentials = DEMO_ROLE_CREDENTIALS[role];
          const isRoleLoading = loadingRole === role && isLoading;
          return (
            <Button
              key={role}
              type="button"
              variant={role === 'ADMIN' ? 'default' : 'outline'}
              size="sm"
              disabled={isLoading}
              onClick={() => void handleQuickRole(role)}
            >
              {isRoleLoading ? 'Signing in…' : credentials.label}
            </Button>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled
          className="cursor-not-allowed opacity-50"
          title="Super Admin is not available from quick sign-in"
          aria-label={`${SUPER_ADMIN_DEMO_LABEL} quick sign-in disabled`}
        >
          <ShieldOff className="h-3.5 w-3.5" />
          {SUPER_ADMIN_DEMO_LABEL}
        </Button>
      </div>

      <form className="space-y-4 border-t border-zinc-200 pt-5 dark:border-zinc-800" onSubmit={(event) => void handleSubmit(event)}>
        <p className={cn('text-xs font-medium uppercase tracking-wide', isEnterprise ? 'text-zinc-500' : 'text-zinc-400')}>
          Manual sign-in
        </p>
        <label className="block space-y-1.5">
          <span className={cn('text-xs font-medium uppercase tracking-wide', isEnterprise ? 'text-zinc-500' : 'text-zinc-400')}>
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="viewer@portfolio.dev"
            className={cn(
              'w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-500',
              isEnterprise
                ? 'border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
                : 'border-zinc-700 bg-zinc-950 text-white',
            )}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={cn('text-xs font-medium uppercase tracking-wide', isEnterprise ? 'text-zinc-500' : 'text-zinc-400')}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={cn(
              'w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-500',
              isEnterprise
                ? 'border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100'
                : 'border-zinc-700 bg-zinc-950 text-white',
            )}
          />
        </label>
        {errorMessage ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
            {errorMessage}
          </p>
        ) : null}
        <Button type="submit" variant="accent" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading && !loadingRole ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
