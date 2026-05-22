export type UserRole = 'STANDARD' | 'ADMIN' | 'SUPER_ADMIN';
export interface AuthUser {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    readonly role: UserRole;
}
export interface LoginRequest {
    readonly email: string;
    readonly password: string;
}
export interface LoginResponse {
    readonly accessToken: string;
    readonly user: AuthUser;
}
export interface UpdatePortfolioContentRequest {
    readonly content: import('./portfolio.types').PortfolioContent;
}
