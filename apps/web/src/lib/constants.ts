function resolveApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL as string | undefined;
  if (!configured) {
    return '/api';
  }
  if (import.meta.env.DEV && configured.includes('localhost:3001')) {
    return '/api';
  }
  return configured;
}

export const API_BASE_URL = resolveApiBaseUrl();

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#workflows' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  WORKFLOWS: 'workflows',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  CERTIFICATIONS: 'certifications',
  GITHUB: 'github',
  CONTACT: 'contact',
} as const;
