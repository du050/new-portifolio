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
      name: 'Frontend',
      icon: 'layout',
      skills: [
        { name: 'React', level: 85, years: 3 },
        { name: 'TypeScript', level: 84, years: 3 },
        { name: 'Tailwind CSS', level: 88, years: 2 },
        { name: 'Vite', level: 80, years: 2 },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'server',
      skills: [
        { name: 'Node.js', level: 82, years: 3 },
        { name: 'NestJS', level: 80, years: 2 },
        { name: 'REST APIs', level: 86, years: 3 },
        { name: 'Prisma', level: 78, years: 2 },
      ],
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', level: 82, years: 2 },
        { name: 'SQL', level: 84, years: 3 },
        { name: 'Redis', level: 68, years: 1 },
      ],
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: 'git-branch',
      skills: [
        { name: 'Docker', level: 80, years: 2 },
        { name: 'Docker Compose', level: 84, years: 2 },
        { name: 'GitHub Actions', level: 76, years: 2 },
        { name: 'Kubernetes', level: 68, years: 1 },
      ],
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: 'cloud',
      skills: [
        { name: 'AWS', level: 72, years: 2 },
        { name: 'ECS / Fargate', level: 65, years: 1 },
        { name: 'S3', level: 74, years: 2 },
      ],
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: 'wrench',
      skills: [
        { name: 'Git', level: 88, years: 4 },
        { name: 'Linux CLI', level: 78, years: 3 },
        { name: 'Jest', level: 76, years: 2 },
        { name: 'Postman', level: 82, years: 3 },
      ],
    },
  ],
  projects: [
    {
      id: '1',
      slug: 'devops-observability-dashboard',
      title: 'Enterprise DevOps Observability Dashboard',
      description:
        'Full-stack operations workspace with live pipelines, service health, Kubernetes signals, metrics charts, alerts, and log streams — built into this portfolio.',
      longDescription:
        'Flagship project demonstrating how I approach product architecture and operational visibility: typed telemetry snapshots, debounced live updates, enterprise dashboard patterns, and an Observability mode that behaves like an internal SaaS console. It reflects my focus on scalable interfaces, maintainable TypeScript, and systems that help teams make better decisions.',
      imageUrl: '/projects/monitoring.svg',
      techStack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Recharts', 'Zustand', 'Docker'],
      category: 'Observability',
      githubUrl: GITHUB_PROFILE_URL,
      demoUrl: '/?mode=dashboard&tab=observability',
      featured: true,
      metrics: [
        { label: 'Panels', value: '12' },
        { label: 'Live refresh', value: '4s' },
        { label: 'Stack', value: 'TS full-stack' },
      ],
      challenges: [
        'Balancing rich operational signal with a clear, non-overwhelming dashboard experience',
        'Keeping admin edits and public portfolio views in sync across creative and enterprise modes',
        'Structuring many monitoring panels with composable, maintainable React architecture',
      ],
      architecture: [
        'Shared portfolio store so admin saves publish immediately to the public UI',
        'Immutable telemetry snapshots updated on a timer with reduced-motion support',
        'Composable monitoring panels sharing enterprise card and chart primitives',
      ],
      scalability: [
        'Debounced auto-save on the admin editor to limit API churn',
        'Separation between data generation hooks and presentational chart components',
        'Deep links from the project section into the live observability workspace',
      ],
    },
  ],
  experiences: [
    {
      id: '1',
      company: 'Product Engineering Team',
      role: 'Full-Stack Software Engineer',
      location: 'Calgary, Canada · Remote',
      startDate: '2024-06',
      endDate: null,
      current: true,
      description:
        'Building and evolving full-stack product features across React, NestJS, and PostgreSQL — from API design and data modeling to intuitive UI flows and deployment-aware delivery.',
      achievements: [
        'Delivered end-to-end features with typed contracts, validation, and accessible UI states',
        'Improved API reliability and frontend clarity through structured reviews and incremental refactors',
        'Introduced operational visibility patterns — logging, health checks, and dashboard-style monitoring',
      ],
      technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'GitHub Actions'],
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
        'Developed web applications and internal tools — translating business requirements into maintainable systems with strong collaboration across design and engineering.',
      achievements: [
        'Built REST APIs and admin interfaces supporting reporting and workflow automation',
        'Optimized database queries and pagination for high-traffic listing experiences',
        'Contributed to CI workflows and containerized local development environments',
      ],
      technologies: ['JavaScript', 'TypeScript', 'PostgreSQL', 'React', 'Node.js', 'Docker Compose'],
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
        'Strengthening cloud fundamentals — core services, security, billing, and how teams deploy scalable workloads responsibly.',
    },
    {
      id: '2',
      name: 'Docker Foundations',
      issuer: 'Docker',
      status: 'completed',
      date: '2025-11',
      credentialUrl: 'https://www.docker.com',
      description:
        'Validated container workflows, image hygiene, and compose patterns used across local development and CI pipelines.',
    },
  ],
  learningPaths: [
    {
      id: '1',
      title: 'Product Architecture & APIs',
      description:
        'Deepening NestJS service design, validation, auth boundaries, and testing practices that keep full-stack systems predictable.',
      progress: 72,
      topics: ['NestJS', 'DTOs', 'JWT', 'Prisma', 'System design'],
    },
    {
      id: '2',
      title: 'Observability & Platform Delivery',
      description:
        'Expanding metrics, structured logs, CI/CD pipelines, and dashboards that make release health and team workflows visible early.',
      progress: 58,
      topics: ['Prometheus', 'Grafana', 'GitHub Actions', 'Docker', 'Runbooks'],
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
    { name: 'Shell', percentage: 8, color: '#89e051' },
    { name: 'CSS', percentage: 7, color: '#264de4' },
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
      description: 'Full-stack developer portfolio with enterprise dashboard and observability workspace',
      stars: 2,
      language: 'TypeScript',
      url: GITHUB_PROFILE_URL,
    },
    {
      name: 'devops-observability-dashboard',
      description: 'Live telemetry panels, charts, and operational UX patterns',
      stars: 1,
      language: 'TypeScript',
      url: GITHUB_PROFILE_URL,
    },
  ],
};
