/**
 * Single source of truth for portfolio identity (seed, API fallback, and HTML meta).
 * Edit this file to match your real name, links, and career details.
 */
export const PORTFOLIO_OWNER = {
  name: 'Maria Xavier',
  title: 'Full-Stack Developer',
  headline: 'Thoughtful interfaces, solid APIs, and clean full-stack code',
  subheadline:
    'I build with React, TypeScript, NestJS, REST APIs, and PostgreSQL — with a strong eye for design and SOLID, maintainable development. I am actively studying deployments and DevOps basics.',
  location: 'Calgary, Canada - Open to Remote/Hybrid',
  email: 'mariacxavier5@outlook.com',
  avatarUrl: '/avatar.svg',
  resumeUrl: '/resume.pdf',
  bio: 'Full-stack developer who enjoys UI design, clear API boundaries, and structured code — currently growing into deployments, Docker, and CI/CD.',
  githubUsername: 'du050',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/du050', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/maria-eduarda-cintra-xavier/', icon: 'linkedin' },
  ],
} as const;

export const PORTFOLIO_OWNER_ABOUT_PARAGRAPHS: readonly string[] = [
  'I am a full-stack developer with hands-on experience in React, TypeScript, NestJS, REST APIs, and PostgreSQL. I care about readable code, sensible folder structure, and features that feel good to use — not just code that compiles.',
  'Design matters to me: layout, spacing, and clear user flows are part of how I work, alongside backend work like DTOs, validation, Prisma models, and SOLID-friendly service layers. I like when the frontend and API tell a consistent story.',
  'Deployments and DevOps are areas I  have experience in and am studying now — Docker, CI concepts, and what healthy releases look like. This portfolio includes a dashboard-style project (more enterprise-focused) where I practice those concepts in the UI while my main strength stays full-stack product development.',
] as const;

export const PORTFOLIO_HTML_META = {
  title: `${PORTFOLIO_OWNER.name} | ${PORTFOLIO_OWNER.title}`,
  description: `${PORTFOLIO_OWNER.name} — ${PORTFOLIO_OWNER.title} portfolio focused on design, React, NestJS, REST APIs, PostgreSQL, and SOLID development.`,
  ogTitle: `${PORTFOLIO_OWNER.name} | ${PORTFOLIO_OWNER.title}`,
  ogDescription:
    'Full-stack developer portfolio — UI design, TypeScript, NestJS, PostgreSQL, and honest growth into deployments and DevOps.',
} as const;
