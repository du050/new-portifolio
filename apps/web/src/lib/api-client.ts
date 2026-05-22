import type { ApiResponse } from '@portfolio/shared';
import { useAuthStore } from '@/stores/auth-store';
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

function buildHeaders(includeAuth: boolean): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(errorBody?.message)
      ? errorBody.message.join(', ')
      : (errorBody?.message ?? `API request failed: ${response.statusText}`);
    throw new ApiClientError(message, response.status);
  }
  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: buildHeaders(false),
  });
  return parseApiResponse<T>(response);
}

export async function fetchAuthApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: buildHeaders(true),
  });
  return parseApiResponse<T>(response);
}

export async function postApi<T, B>(endpoint: string, body: B): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: buildHeaders(false),
    body: JSON.stringify(body),
  });
  return parseApiResponse<T>(response);
}

export async function postAuthApi<T, B>(endpoint: string, body: B): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(body),
  });
  return parseApiResponse<T>(response);
}

export async function putAuthApi<T, B>(endpoint: string, body: B): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: buildHeaders(true),
    body: JSON.stringify(body),
  });
  return parseApiResponse<T>(response);
}
