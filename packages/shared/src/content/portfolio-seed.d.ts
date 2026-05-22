import type { PortfolioContent } from '../types/portfolio.types';
export declare const PORTFOLIO_SEED_CONTENT: PortfolioContent;
export declare const GITHUB_FALLBACK_STATS: {
    username: string;
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalCommits: number;
    languages: {
        name: string;
        percentage: number;
        color: string;
    }[];
    commitActivity: {
        date: string;
        count: number;
    }[];
    contributions: {
        date: string;
        count: number;
        level: number;
    }[];
    topRepositories: {
        name: string;
        description: string;
        stars: number;
        language: string;
        url: string;
    }[];
};
