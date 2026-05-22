export interface SocialLink {
    readonly platform: string;
    readonly url: string;
    readonly icon: string;
}
export interface Profile {
    readonly name: string;
    readonly title: string;
    readonly headline: string;
    readonly subheadline: string;
    readonly location: string;
    readonly email: string;
    readonly avatarUrl: string;
    readonly resumeUrl: string;
    readonly bio: string;
    readonly aboutParagraphs: readonly string[];
    readonly socialLinks: readonly SocialLink[];
}
export interface SkillCategory {
    readonly id: string;
    readonly name: string;
    readonly icon: string;
    readonly skills: readonly Skill[];
}
export interface Skill {
    readonly name: string;
    readonly level: number;
    readonly years?: number;
}
export interface ProjectMetric {
    readonly label: string;
    readonly value: string;
}
export interface Project {
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly longDescription: string;
    readonly imageUrl: string;
    readonly techStack: readonly string[];
    readonly category: string;
    readonly githubUrl: string;
    readonly demoUrl: string;
    readonly featured: boolean;
    readonly metrics: readonly ProjectMetric[];
    readonly challenges: readonly string[];
    readonly architecture: readonly string[];
    readonly scalability: readonly string[];
}
export interface Experience {
    readonly id: string;
    readonly company: string;
    readonly role: string;
    readonly location: string;
    readonly startDate: string;
    readonly endDate: string | null;
    readonly current: boolean;
    readonly description: string;
    readonly achievements: readonly string[];
    readonly technologies: readonly string[];
}
export interface Certification {
    readonly id: string;
    readonly name: string;
    readonly issuer: string;
    readonly status: 'completed' | 'in_progress' | 'planned';
    readonly date: string | null;
    readonly credentialUrl: string;
    readonly description: string;
}
export interface LearningPath {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly progress: number;
    readonly topics: readonly string[];
}
export interface PortfolioContent {
    readonly profile: Profile;
    readonly skillCategories: readonly SkillCategory[];
    readonly projects: readonly Project[];
    readonly experiences: readonly Experience[];
    readonly certifications: readonly Certification[];
    readonly learningPaths: readonly LearningPath[];
}
