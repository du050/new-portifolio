import type { PortfolioContent } from '../types/portfolio.types';
import {
  PORTFOLIO_OWNER,
  PORTFOLIO_OWNER_ABOUT_PARAGRAPHS,
} from './portfolio-owner';

const GITHUB_PROFILE_URL = `https://github.com/${PORTFOLIO_OWNER.githubUsername}`;

export const PORTFOLIO_SEED_CONTENT: PortfolioContent = {
  profile: {
    name: PORTFOLIO_OWNER.name,
    title: PORTFOLIO_OWNER.title,
    headline: PORTFOLIO_OWNER.headline,
    subheadline: PORTFOLIO_OWNER.subheadline,
    location: PORTFOLIO_OWNER.location,
    email: PORTFOLIO_OWNER.email,
    avatarUrl: PORTFOLIO_OWNER.avatarUrl,
    resumeUrl: PORTFOLIO_OWNER.resumeUrl,
    bio: PORTFOLIO_OWNER.bio,
    aboutParagraphs: [...PORTFOLIO_OWNER_ABOUT_PARAGRAPHS],
    socialLinks: [...PORTFOLIO_OWNER.socialLinks],
  },
  skillCategories: [
    {
      id: 'frontend',
      name: 'Frontend & design',
      icon: 'layout',
      skills: [
        { name: 'React', level: 80, years: 2 },
        { name: 'TypeScript', level: 78, years: 2 },
        { name: 'UI / UX design', level: 82, years: 2 },
        { name: 'Tailwind CSS', level: 84, years: 2 },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'server',
      skills: [
        { name: 'NestJS', level: 76, years: 2 },
        { name: 'REST APIs', level: 80, years: 2 },
        { name: 'Node.js', level: 74, years: 2 },
        { name: 'Prisma', level: 72, years: 1 },
      ],
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', level: 76, years: 2 },
        { name: 'SQL', level: 78, years: 2 },
        { name: 'Data modeling', level: 70, years: 1 },
      ],
    },
    {
      id: 'practices',
      name: 'Engineering practices',
      icon: 'wrench',
      skills: [
        { name: 'SOLID principles', level: 75, years: 2 },
        { name: 'Clean architecture', level: 68, years: 1 },
        { name: 'Jest / testing basics', level: 65, years: 1 },
        { name: 'Git & code review', level: 82, years: 3 },
      ],
    },
    {
      id: 'devops',
      name: 'Deployments (learning)',
      icon: 'git-branch',
      skills: [
        { name: 'Docker basics', level: 58, years: 1 },
        { name: 'Docker Compose', level: 55, years: 1 },
        { name: 'CI/CD concepts', level: 48, years: 1 },
        { name: 'GitHub Actions', level: 45, years: 1 },
      ],
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: 'box',
      skills: [
        { name: 'Postman', level: 80, years: 2 },
        { name: 'Vite', level: 76, years: 1 },
        { name: 'VS Code', level: 88, years: 3 },
        { name: 'Figma', level: 72, years: 2 },
      ],
    },
  ],
  projects: [
    {
      id: '1',
      slug: 'devops-observability-dashboard',
      title: 'Portfolio Dashboard & Observability UI',
      description:
        'A full-stack portfolio with a creative site plus a dashboard mode — charts, status panels, and simulated ops views built while I study deployments and delivery workflows.',
      longDescription:
        'This is my main portfolio build: React and TypeScript on the front, NestJS and PostgreSQL on the back, and an admin editor for content. The observability dashboard is a learning-focused UI — it practices layout, state management, and how monitoring screens are structured, without claiming production SRE experience.',
      imageUrl: '/projects/monitoring.svg',
      techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Zustand'],
      category: 'Full-stack',
      githubUrl: GITHUB_PROFILE_URL,
      demoUrl: '/?mode=dashboard&tab=observability',
      featured: true,
      metrics: [
        { label: 'Modes', value: '2' },
        { label: 'Stack', value: 'TS full-stack' },
        { label: 'Focus', value: 'UI + APIs' },
      ],
      challenges: [
        'Keeping typed API contracts aligned with React forms and admin edits',
        'Designing dashboard panels that feel clear without overclaiming ops expertise',
        'Organizing components so creative and enterprise views share the same data',
      ],
      architecture: [
        'NestJS modules with validated DTOs and Prisma for portfolio content',
        'Shared client store so public pages reflect admin updates',
        'Separated presentational dashboard panels from synthetic demo telemetry',
      ],
      scalability: [
        'SOLID-friendly service boundaries on the API',
        'Reusable UI primitives for cards, charts, and section layouts',
        'Room to grow into real deployment tooling as I learn Docker and CI/CD',
      ],
    },
  ],
  experiences: [
    {
      id: '1',
      company: 'Product Engineering Team',
      role: 'Full-Stack Developer',
      location: 'Calgary, Canada · Remote',
      startDate: '2024-06',
      endDate: null,
      current: true,
      description:
        'Building product features across React, NestJS, and PostgreSQL — REST endpoints, database models, and interfaces with attention to design and maintainable structure.',
      achievements: [
        'Shipped user flows with loading states, validation, and consistent UI patterns',
        'Improved API handlers and DTOs with clearer separation of concerns',
        'Collaborated on code reviews focused on readability and SOLID-friendly changes',
      ],
      technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'REST'],
    },
    {
      id: '2',
      company: 'Software Solutions',
      role: 'Software Developer',
      location: 'Calgary, Canada',
      startDate: '2022-08',
      endDate: '2024-05',
      current: false,
      description:
        'Developed web applications and internal tools — from UI mockups to REST APIs and database queries.',
      achievements: [
        'Built REST endpoints and admin screens for reporting workflows',
        'Improved list pages with pagination and clearer SQL queries',
        'Worked with designers and teammates to refine frontend behavior',
      ],
      technologies: ['JavaScript', 'TypeScript', 'PostgreSQL', 'React', 'Node.js'],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      status: 'in_progress',
      date: null,
      credentialUrl: 'https://aws.amazon.com/certification',
      description:
        'Learning cloud fundamentals — core services, security basics, and how applications are hosted.',
    },
    {
      id: '2',
      name: 'Docker Foundations',
      issuer: 'Docker',
      status: 'in_progress',
      date: null,
      credentialUrl: 'https://www.docker.com',
      description:
        'Building confidence with images, containers, and compose files for local full-stack development.',
    },
  ],
  learningPaths: [
    {
      id: '1',
      title: 'Full-stack & SOLID craft',
      description:
        'Strengthening NestJS APIs, React features, PostgreSQL modeling, validation, and tests that support steady feature work.',
      progress: 70,
      topics: ['NestJS', 'REST', 'Prisma', 'React', 'SOLID'],
    },
    {
      id: '2',
      title: 'Deployments & DevOps basics',
      description:
        'Studying Docker, environment configuration, CI/CD ideas, and what a healthy release process looks like — still learning in practice.',
      progress: 35,
      topics: ['Docker', 'Compose', 'GitHub Actions', 'Environments', 'Deploy concepts'],
    },
  ],
};

export const GITHUB_FALLBACK_STATS = {
  username: PORTFOLIO_OWNER.githubUsername,
  publicRepos: 22,
  followers: 12,
  following: 18,
  totalStars: 35,
  totalCommits: 820,
  languages: [
    { name: 'TypeScript', percentage: 54, color: '#3178c6' },
    { name: 'JavaScript', percentage: 26, color: '#f7df1e' },
    { name: 'CSS', percentage: 10, color: '#264de4' },
    { name: 'HTML', percentage: 5, color: '#e34c26' },
    { name: 'SQL', percentage: 5, color: '#336791' },
  ],
  commitActivity: Array.from({ length: 52 }, (_, weekIndex) => {
    const isoDate = new Date(
      Date.now() - (51 - weekIndex) * 7 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const datePart = isoDate.split('T')[0] ?? isoDate.slice(0, 10);
    return {
      date: datePart,
      count: Math.floor(Math.random() * 12) + 1,
    };
  }),
  contributions: Array.from({ length: 365 }, (_, dayIndex) => {
    const dateObject = new Date(Date.now() - (364 - dayIndex) * 24 * 60 * 60 * 1000);
    const isoDate = dateObject.toISOString();
    const datePart = isoDate.split('T')[0] ?? isoDate.slice(0, 10);
    const count = Math.floor(Math.random() * 6);
    return {
      date: datePart,
      count,
      level: count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 6 ? 3 : 4,
    };
  }),
  topRepositories: [
    {
      name: 'new-portifolio',
      description: 'Full-stack portfolio with React, NestJS, PostgreSQL, and dashboard UI',
      stars: 2,
      language: 'TypeScript',
      url: GITHUB_PROFILE_URL,
    },
    {
      name: 'portfolio-dashboard-ui',
      description: 'Dashboard and observability-style panels — learning project',
      stars: 1,
      language: 'TypeScript',
      url: GITHUB_PROFILE_URL,
    },
  ],
};
