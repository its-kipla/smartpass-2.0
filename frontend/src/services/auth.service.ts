import { request } from './api';
import type { AuthResponse } from '../utils/session';

export interface RegistrationDetails {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const login = (credentials: LoginCredentials): Promise<AuthResponse> =>
  request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const register = (details: RegistrationDetails): Promise<AuthResponse> =>
  request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(details),
  });

export const getCurrentUser = (): Promise<Record<string, unknown>> =>
  request<Record<string, unknown>>('/auth/me');
