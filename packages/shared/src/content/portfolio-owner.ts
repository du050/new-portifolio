/**
 * Single source of truth for portfolio identity (seed, API fallback, and HTML meta).
 * Edit this file to match your real name, links, and career details.
 */
export const PORTFOLIO_OWNER = {
  name: 'Maria Xavier',
  title: 'Full-Stack Software Engineer',
  headline: 'Designing scalable systems, intuitive experiences, and operationally sound products',
  subheadline:
    'Full-stack engineer specializing in TypeScript ecosystems, product architecture, and building solutions that balance usability, maintainability, and business goals.',
  location: 'Calgary, Canada - Open to Remote/Hybrid',
  email: 'mariacxavier5@outlook.com',
  avatarUrl: '/avatar.svg',
  resumeUrl: '/resume.pdf',
  bio: 'Full-stack software engineer focused on building structured, scalable systems that combine strong engineering foundations with thoughtful product design.',
  githubUsername: 'du050',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/du050', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/maria-eduarda-cintra-xavier/', icon: 'linkedin' },
  ],
} as const;

export const PORTFOLIO_OWNER_ABOUT_PARAGRAPHS = [
  'I am a full-stack software engineer with experience building applications across React, NestJS, PostgreSQL, and modern cloud-native tooling. I enjoy transforming complex requirements into structured, maintainable systems that are intuitive for both users and teams.',
  
  'Beyond implementation, I focus on architecture, workflows, and operational visibility. From designing scalable interfaces to building observability dashboards and internal tooling, I enjoy creating systems that help organizations operate more efficiently and make better decisions.',
  
  'I am particularly interested in the intersection of technology, business processes, and innovation. My goal is not only to build software, but to create solutions that improve how teams collaborate, adapt, and grow.'
] as const;

export const PORTFOLIO_HTML_META = {
  title: `${PORTFOLIO_OWNER.name} | ${PORTFOLIO_OWNER.title}`,
  description: `${PORTFOLIO_OWNER.name} — ${PORTFOLIO_OWNER.title} portfolio with full-stack projects, architecture, and operational excellence.`,
  ogTitle: `${PORTFOLIO_OWNER.name} | ${PORTFOLIO_OWNER.title}`,
  ogDescription:
    'Full-stack software engineer portfolio — designing scalable systems, intuitive experiences, and operationally sound products.',
} as const;
