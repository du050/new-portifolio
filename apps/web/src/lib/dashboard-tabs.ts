import {
  Activity,
  Award,
  Briefcase,
  GitBranch,
  LayoutDashboard,
  Mail,
  Route,
  Shield,
  Sparkles,
  Table2,
  User,
  type LucideIcon,
} from 'lucide-react';

export type DashboardTabId =
  | 'overview'
  | 'profile'
  | 'process'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'growth'
  | 'analytics'
  | 'observability'
  | 'contact'
  | 'admin';

export interface DashboardTabDefinition {
  readonly id: DashboardTabId;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly creativeSectionId: string;
}

export const DASHBOARD_TABS: readonly DashboardTabDefinition[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, creativeSectionId: 'hero' },
  { id: 'profile', label: 'Profile', icon: User, creativeSectionId: 'about' },
  { id: 'process', label: 'Process', icon: Route, creativeSectionId: 'workflows' },
  { id: 'skills', label: 'Skills', icon: Sparkles, creativeSectionId: 'skills' },
  { id: 'projects', label: 'Projects', icon: Table2, creativeSectionId: 'projects' },
  { id: 'experience', label: 'Experience', icon: Briefcase, creativeSectionId: 'experience' },
  { id: 'growth', label: 'Growth', icon: Award, creativeSectionId: 'certifications' },
  { id: 'analytics', label: 'Analytics', icon: GitBranch, creativeSectionId: 'github' },
  { id: 'observability', label: 'Observability', icon: Activity, creativeSectionId: 'projects' },
  { id: 'contact', label: 'Contact', icon: Mail, creativeSectionId: 'contact' },
  { id: 'admin', label: 'Admin', icon: Shield, creativeSectionId: 'hero' },
] as const;

export const DEFAULT_DASHBOARD_TAB: DashboardTabId = 'overview';
