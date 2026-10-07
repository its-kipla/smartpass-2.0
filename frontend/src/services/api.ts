import { API_BASE_URL } from '../config/api';
import { getToken } from '../utils/session';

interface ApiErrorResponse {
  error?: string;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Cannot reach Smart Pass API at ${API_BASE_URL}`);
    }
    throw error;
  }

  const responseText = await response.text();
  let data: unknown = null;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (response.ok) throw new Error('Smart Pass API returned an invalid response');
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'error' in data
        ? (data as ApiErrorResponse).error
        : undefined;
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return data as T;
}
