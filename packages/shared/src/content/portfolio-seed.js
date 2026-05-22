"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_FALLBACK_STATS = exports.PORTFOLIO_SEED_CONTENT = void 0;
exports.PORTFOLIO_SEED_CONTENT = {
    profile: {
        name: 'Alex Rivera',
        title: 'Senior Software Engineer',
        headline: 'Building resilient systems at the intersection of software and infrastructure',
        subheadline: 'Full-stack engineer evolving into cloud-native architecture — shipping products with the rigor of production operations.',
        location: 'San Francisco, CA',
        email: 'alex.rivera@engineer.dev',
        avatarUrl: '/avatar.svg',
        resumeUrl: '/resume.pdf',
        bio: 'Software engineer with a passion for scalable systems, cloud infrastructure, and developer experience.',
        aboutParagraphs: [
            'I am a senior software engineer with over six years of experience building production applications across fintech, SaaS, and developer tooling. My work spans React frontends, NestJS microservices, and the operational layers that keep them reliable in production.',
            'Over the past two years, I have deliberately expanded into cloud engineering and DevOps — designing Kubernetes deployments, automating CI/CD pipelines, and implementing observability stacks that give teams confidence in their releases.',
            'I believe the best engineers think in systems: understanding how code behaves under load, how infrastructure scales, and how teams ship safely. That mindset drives everything I build.',
        ],
        socialLinks: [
            { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
            { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
            { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        ],
    },
    skillCategories: [
        {
            id: 'frontend',
            name: 'Frontend',
            icon: 'layout',
            skills: [
                { name: 'React', level: 95, years: 5 },
                { name: 'TypeScript', level: 92, years: 4 },
                { name: 'Next.js', level: 85, years: 3 },
                { name: 'TailwindCSS', level: 90, years: 3 },
                { name: 'Vue.js', level: 75, years: 2 },
            ],
        },
        {
            id: 'backend',
            name: 'Backend',
            icon: 'server',
            skills: [
                { name: 'Node.js', level: 92, years: 5 },
                { name: 'NestJS', level: 90, years: 3 },
                { name: 'PostgreSQL', level: 88, years: 4 },
                { name: 'Redis', level: 82, years: 3 },
                { name: 'GraphQL', level: 78, years: 2 },
            ],
        },
        {
            id: 'cloud',
            name: 'Cloud',
            icon: 'cloud',
            skills: [
                { name: 'AWS', level: 85, years: 3 },
                { name: 'EC2 / ECS', level: 82, years: 2 },
                { name: 'S3 / CloudFront', level: 88, years: 3 },
                { name: 'Lambda', level: 80, years: 2 },
                { name: 'RDS', level: 85, years: 3 },
            ],
        },
        {
            id: 'devops',
            name: 'DevOps',
            icon: 'git-branch',
            skills: [
                { name: 'Docker', level: 90, years: 3 },
                { name: 'Kubernetes', level: 82, years: 2 },
                { name: 'Terraform', level: 78, years: 2 },
                { name: 'GitHub Actions', level: 88, years: 3 },
                { name: 'CI/CD', level: 90, years: 4 },
            ],
        },
        {
            id: 'databases',
            name: 'Databases',
            icon: 'database',
            skills: [
                { name: 'PostgreSQL', level: 88, years: 4 },
                { name: 'Redis', level: 82, years: 3 },
                { name: 'MongoDB', level: 75, years: 2 },
                { name: 'Prisma', level: 90, years: 2 },
            ],
        },
        {
            id: 'containers',
            name: 'Containers',
            icon: 'box',
            skills: [
                { name: 'Docker', level: 90, years: 3 },
                { name: 'Kubernetes', level: 82, years: 2 },
                { name: 'Helm', level: 75, years: 1 },
                { name: 'Docker Compose', level: 92, years: 3 },
            ],
        },
        {
            id: 'cicd',
            name: 'CI/CD',
            icon: 'workflow',
            skills: [
                { name: 'GitHub Actions', level: 88, years: 3 },
                { name: 'Jenkins', level: 70, years: 2 },
                { name: 'ArgoCD', level: 72, years: 1 },
                { name: 'GitLab CI', level: 75, years: 2 },
            ],
        },
        {
            id: 'infrastructure',
            name: 'Infrastructure',
            icon: 'network',
            skills: [
                { name: 'Terraform', level: 78, years: 2 },
                { name: 'AWS VPC', level: 80, years: 2 },
                { name: 'Nginx', level: 85, years: 4 },
                { name: 'Linux', level: 88, years: 6 },
            ],
        },
        {
            id: 'monitoring',
            name: 'Monitoring',
            icon: 'activity',
            skills: [
                { name: 'Prometheus', level: 80, years: 2 },
                { name: 'Grafana', level: 82, years: 2 },
                { name: 'Datadog', level: 75, years: 2 },
                { name: 'ELK Stack', level: 70, years: 1 },
            ],
        },
        {
            id: 'tools',
            name: 'Tools',
            icon: 'wrench',
            skills: [
                { name: 'Git', level: 95, years: 6 },
                { name: 'Linux', level: 88, years: 6 },
                { name: 'VS Code', level: 95, years: 5 },
                { name: 'Postman', level: 90, years: 4 },
            ],
        },
    ],
    projects: [
        {
            id: '1',
            slug: 'devops-observability-dashboard',
            title: 'Enterprise DevOps Observability Dashboard',
            description: 'Datadog-style operations workspace with live pipelines, Kubernetes health, SLO metrics, alerts, and streaming logs — built into this portfolio.',
            longDescription: 'Designed and shipped an enterprise observability experience inside the portfolio dashboard: deployment pipeline stages, service health pulses, pod and node telemetry, Recharts time-series for CPU, memory, throughput, and latency, plus alert routing and a CI/CD activity feed. Synthetic telemetry ticks every few seconds so demos feel like a real internal ops platform without backend dependencies.',
            imageUrl: '/projects/monitoring.svg',
            techStack: ['React', 'TypeScript', 'Recharts', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
            category: 'Observability',
            githubUrl: 'https://github.com',
            demoUrl: '/?mode=dashboard&tab=observability',
            featured: true,
            metrics: [
                { label: 'Uptime', value: '99.97%' },
                { label: 'P95 Latency', value: '142ms' },
                { label: 'Panels', value: '12' },
            ],
            challenges: [
                'Keeping synthetic metrics plausible without noisy random jumps',
                'Balancing information density with readable enterprise layout',
                'Respecting reduced-motion while still signaling live operations',
            ],
            architecture: [
                'Typed snapshot model with deterministic tick updates for time series',
                'Dedicated Observability tab behind the enterprise auth gate',
                'Composable monitoring panels sharing enterprise card primitives',
            ],
            scalability: [
                'Hook-based live refresh decoupled from presentation components',
                'Snapshot immutability for predictable React renders at scale',
                'Tab deep links so the project section opens the live workspace directly',
            ],
        },
    ],
    experiences: [
        {
            id: '1',
            company: 'TechScale Inc.',
            role: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            startDate: '2023-01',
            endDate: null,
            current: true,
            description: 'Leading full-stack development for a B2B SaaS platform serving 10,000+ enterprise users. Driving architectural decisions and mentoring junior engineers.',
            achievements: [
                'Reduced API response times by 40% through query optimization and caching strategies',
                'Led migration from monolith to microservices, improving deployment frequency 3x',
                'Implemented observability stack reducing MTTR from 2 hours to 25 minutes',
                'Mentored team of 4 engineers on cloud-native development practices',
            ],
            technologies: ['React', 'NestJS', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
        },
        {
            id: '2',
            company: 'CloudFirst Solutions',
            role: 'Software Engineer',
            location: 'Remote',
            startDate: '2021-03',
            endDate: '2022-12',
            current: false,
            description: 'Built and maintained cloud-native applications on AWS. Introduced CI/CD automation and infrastructure-as-code practices to the engineering team.',
            achievements: [
                'Designed CI/CD pipelines reducing deployment time from 45 to 8 minutes',
                'Provisioned AWS infrastructure using Terraform for 3 production environments',
                'Implemented automated testing pipeline achieving 85% code coverage',
            ],
            technologies: ['Node.js', 'React', 'AWS', 'Terraform', 'Docker', 'GitHub Actions'],
        },
        {
            id: '3',
            company: 'DataFlow Systems',
            role: 'Junior Software Engineer',
            location: 'Austin, TX',
            startDate: '2019-06',
            endDate: '2021-02',
            current: false,
            description: 'Developed features for a data analytics platform. Gained foundational experience in backend APIs, database design, and agile development.',
            achievements: [
                'Built REST APIs processing 1M+ records daily with sub-100ms response times',
                'Contributed to frontend redesign improving user engagement by 25%',
                'Participated in on-call rotation and incident response procedures',
            ],
            technologies: ['JavaScript', 'Express', 'PostgreSQL', 'React', 'Redis'],
        },
    ],
    certifications: [
        {
            id: '1',
            name: 'AWS Solutions Architect Associate',
            issuer: 'Amazon Web Services',
            status: 'in_progress',
            date: null,
            credentialUrl: 'https://aws.amazon.com/certification',
            description: 'Validating expertise in designing distributed systems on AWS including compute, storage, networking, and security.',
        },
        {
            id: '2',
            name: 'Certified Kubernetes Administrator (CKA)',
            issuer: 'Cloud Native Computing Foundation',
            status: 'planned',
            date: null,
            credentialUrl: 'https://www.cncf.io/certification/cka/',
            description: 'Demonstrating ability to perform responsibilities of a Kubernetes administrator in production environments.',
        },
    ],
    learningPaths: [
        {
            id: '1',
            title: 'DevOps Engineering Roadmap',
            description: 'Deepening expertise in container orchestration, infrastructure automation, and site reliability practices.',
            progress: 72,
            topics: ['Kubernetes', 'Terraform', 'Prometheus', 'ArgoCD', 'Service Mesh'],
        },
        {
            id: '2',
            title: 'Cloud Architecture Mastery',
            description: 'Advancing cloud-native design patterns, multi-region architectures, and cost optimization strategies.',
            progress: 58,
            topics: ['AWS Well-Architected', 'Multi-Region', 'Serverless', 'Event-Driven'],
        },
        {
            id: '3',
            title: 'Platform Engineering',
            description: 'Building internal developer platforms, golden paths, and self-service infrastructure tooling.',
            progress: 35,
            topics: ['Backstage', 'IDP', 'Golden Paths', 'Developer Experience'],
        },
    ],
};
exports.GITHUB_FALLBACK_STATS = {
    username: 'alexrivera-dev',
    publicRepos: 42,
    followers: 128,
    following: 64,
    totalStars: 312,
    totalCommits: 2847,
    languages: [
        { name: 'TypeScript', percentage: 38, color: '#3178c6' },
        { name: 'JavaScript', percentage: 22, color: '#f7df1e' },
        { name: 'Python', percentage: 15, color: '#3776ab' },
        { name: 'Go', percentage: 12, color: '#00add8' },
        { name: 'HCL', percentage: 8, color: '#844fba' },
        { name: 'Shell', percentage: 5, color: '#89e051' },
    ],
    commitActivity: Array.from({ length: 52 }, (_, weekIndex) => {
        const isoDate = new Date(Date.now() - (51 - weekIndex) * 7 * 24 * 60 * 60 * 1000).toISOString();
        const datePart = isoDate.split('T')[0] ?? isoDate.slice(0, 10);
        return {
            date: datePart,
            count: Math.floor(Math.random() * 30) + 5,
        };
    }),
    contributions: Array.from({ length: 365 }, (_, dayIndex) => {
        const dateObject = new Date(Date.now() - (364 - dayIndex) * 24 * 60 * 60 * 1000);
        const isoDate = dateObject.toISOString();
        const datePart = isoDate.split('T')[0] ?? isoDate.slice(0, 10);
        const count = Math.floor(Math.random() * 12);
        return {
            date: datePart,
            count,
            level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4,
        };
    }),
    topRepositories: [
        {
            name: 'devops-observability-dashboard',
            description: 'Enterprise observability workspace with live telemetry',
            stars: 22,
            language: 'TypeScript',
            url: 'https://github.com',
        },
    ],
};
//# sourceMappingURL=portfolio-seed.js.map