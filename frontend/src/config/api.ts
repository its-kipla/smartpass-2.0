declare global {
  interface Window {
    SMARTPASS_API_URL?: string;
  }
}

const configuredBaseUrl =
  (typeof window !== 'undefined' && window.SMARTPASS_API_URL) ||
  (import.meta.env.VITE_API_URL as string | undefined) ||
  '/api';

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');
