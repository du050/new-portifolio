import type { ApiResponse } from '@portfolio/shared';
import { API_BASE_URL } from './constants';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new ApiClientError(`API request failed: ${response.statusText}`, response.status);
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}

export async function postApi<T, B>(endpoint: string, body: B): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new ApiClientError(
      errorBody?.message ?? `API request failed: ${response.statusText}`,
      response.status,
    );
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}
