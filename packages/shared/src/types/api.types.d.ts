export interface ApiResponse<T> {
    readonly success: boolean;
    readonly data: T;
    readonly timestamp: string;
}
export interface ApiErrorResponse {
    readonly success: false;
    readonly message: string;
    readonly statusCode: number;
    readonly timestamp: string;
}
export interface HealthCheckResponse {
    readonly status: 'ok' | 'degraded';
    readonly version: string;
    readonly uptime: number;
    readonly database: 'connected' | 'disconnected';
}
