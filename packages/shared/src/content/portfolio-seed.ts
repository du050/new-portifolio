import type { PortfolioContent } from '../types/portfolio.types';

export const PORTFOLIO_SEED_CONTENT: PortfolioContent = {
  profile: {
    name: 'Jordan Kim',
    title: 'Junior Software Engineer',
    headline: 'Building reliable full-stack products with clear code and growing operational discipline',
    subheadline:
      'Early-career engineer focused on TypeScript, thoughtful APIs, and shipping features that are observable, testable, and easy for teams to maintain.',
    location: 'Remote · open to hybrid',
    email: 'jordan.kim@engineer.dev',
    avatarUrl: '/avatar.svg',
    resumeUrl: '/resume.pdf',
    bio: 'Junior software engineer who cares about readable systems, steady delivery, and learning production practices the right way.',
    aboutParagraphs: [
      'I am a junior software engineer with hands-on experience across React, NestJS, and PostgreSQL — from coursework and personal builds to collaborative team delivery. I prioritize typed boundaries, small pull requests, and asking clear questions when requirements are ambiguous.',
      'I am deliberately growing into DevOps and observability: containerized local stacks, CI pipelines, and dashboards that make deploy health visible before users notice issues. This portfolio includes a live observability workspace to show that mindset in practice.',
      'I work best on teams that value mentorship, code review, and incremental improvement. My goal is to contribute reliably today while building the depth to own services end-to-end over time.',
    ],
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    ],
  },
  skillCategories: [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'layout',
      skills: [
        { name: 'React', level: 78, years: 2 },
        { name: 'TypeScript', level: 76, years: 2 },
        { name: 'Tailwind CSS', level: 82, years: 1 },
        { name: 'Vite', level: 74, years: 1 },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'server',
      skills: [
        { name: 'Node.js', level: 72, years: 2 },
        { name: 'NestJS', level: 68, years: 1 },
        { name: 'REST APIs', level: 75, years: 2 },
        { name: 'Prisma', level: 70, years: 1 },
      ],
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', level: 70, years: 1 },
        { name: 'SQL fundamentals', level: 74, years: 2 },
        { name: 'Redis', level: 58, years: 1 },
      ],
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: 'git-branch',
      skills: [
        { name: 'Docker', level: 72, years: 1 },
        { name: 'Docker Compose', level: 78, years: 1 },
        { name: 'GitHub Actions', level: 65, years: 1 },
        { name: 'Kubernetes basics', level: 55, years: 1 },
      ],
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: 'cloud',
      skills: [
        { name: 'AWS fundamentals', level: 60, years: 1 },
        { name: 'ECS / Fargate', level: 52, years: 1 },
        { name: 'S3', level: 64, years: 1 },
      ],
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: 'wrench',
      skills: [
        { name: 'Git', level: 80, years: 3 },
        { name: 'Linux CLI', level: 68, years: 2 },
        { name: 'Jest', level: 66, years: 1 },
        { name: 'Postman', level: 75, years: 2 },
      ],
    },
  ],
  projects: [
    {
      id: '1',
      slug: 'devops-observability-dashboard',
      title: 'Enterprise DevOps Observability Dashboard',
      description:
        'A portfolio-integrated operations workspace — live pipelines, service health, Kubernetes signals, metrics charts, alerts, and log streams.',
      longDescription:
        'Built as a flagship portfolio project to practice full-stack delivery with production-minded UX: typed telemetry snapshots, debounced live updates, enterprise dashboard patterns, and an Observability tab that behaves like an internal SaaS console. The goal was to demonstrate how I think about deploy safety, signal clarity, and maintainable React architecture — not just feature count.',
      imageUrl: '/projects/monitoring.svg',
      techStack: ['React', 'TypeScript', 'Recharts', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
      category: 'Observability',
      githubUrl: 'https://github.com',
      demoUrl: '/?mode=dashboard&tab=observability',
      featured: true,
      metrics: [
        { label: 'Panels', value: '12' },
        { label: 'Live refresh', value: '4s' },
        { label: 'Stack', value: 'TS + React' },
      ],
      challenges: [
        'Making simulated metrics feel credible without distracting motion or noise',
        'Keeping admin edits and public portfolio views in sync across modes',
        'Structuring many panels without overwhelming a junior-scope codebase',
      ],
      architecture: [
        'Normalized portfolio store so admin saves publish immediately to the public UI',
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
      company: 'Northline Software',
      role: 'Junior Software Engineer',
      location: 'Remote',
      startDate: '2024-06',
      endDate: null,
      current: true,
      description:
        'Contributing to a B2B web product alongside senior engineers — feature work, code review, and incremental improvements to API reliability and frontend clarity.',
      achievements: [
        'Shipped customer-facing UI flows with accessible states, loading indicators, and form validation',
        'Added integration tests around critical NestJS endpoints and reduced regression bugs in sprint review',
        'Participated in on-call shadowing and documented runbooks for common deployment checks',
      ],
      technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    },
    {
      id: '2',
      company: 'Campus Tech Labs',
      role: 'Software Engineering Intern',
      location: 'Austin, TX',
      startDate: '2023-05',
      endDate: '2024-05',
      current: false,
      description:
        'Supported a small team maintaining internal tools and a student-facing portal — learned agile rituals, pull request hygiene, and practical SQL debugging.',
      achievements: [
        'Built REST endpoints and admin views used by staff for weekly reporting',
        'Improved query performance on a high-traffic listing page with indexing and pagination',
        'Presented an end-of-internship demo on observability basics and structured logging',
      ],
      technologies: ['JavaScript', 'Express', 'PostgreSQL', 'React', 'Docker Compose'],
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
        'Building a structured view of core AWS services, billing, security, and how teams deploy real workloads responsibly.',
    },
    {
      id: '2',
      name: 'Docker Foundations',
      issuer: 'Docker',
      status: 'completed',
      date: '2025-11',
      credentialUrl: 'https://www.docker.com',
      description:
        'Validated container basics, image hygiene, and compose workflows used in local and CI environments.',
    },
  ],
  learningPaths: [
    {
      id: '1',
      title: 'Backend & API Design',
      description:
        'Deepening NestJS patterns, validation, auth, and testing habits that keep services predictable under change.',
      progress: 62,
      topics: ['NestJS', 'DTOs', 'JWT', 'Prisma', 'Jest'],
    },
    {
      id: '2',
      title: 'Observability & Delivery',
      description:
        'Practicing metrics, structured logs, CI pipelines, and dashboards that make release health visible early.',
      progress: 48,
      topics: ['Prometheus', 'Grafana', 'GitHub Actions', 'Docker', 'Runbooks'],
    },
  ],
};

export const GITHUB_FALLBACK_STATS = {
  username: 'jordankim-dev',
  publicRepos: 18,
  followers: 24,
  following: 41,
  totalStars: 47,
  totalCommits: 640,
  languages: [
    { name: 'TypeScript', percentage: 52, color: '#3178c6' },
    { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
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
      name: 'devops-observability-dashboard',
      description: 'Portfolio observability workspace with live telemetry',
      stars: 8,
      language: 'TypeScript',
      url: 'https://github.com',
    },
    {
      name: 'nestjs-portfolio-api',
      description: 'NestJS API backing this portfolio site',
      stars: 5,
      language: 'TypeScript',
      url: 'https://github.com',
    },
  ],
};
