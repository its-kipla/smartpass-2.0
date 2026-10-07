import { request } from './api';

export interface VisitType {
  id: number;
  name: string;
}

export interface VisitTypesResponse {
  visitTypes: VisitType[];
}

export interface CreateVisitDetails {
  visitTypeId: number;
  visitDate: string;
  purpose: string;
}

export const getVisitTypes = (): Promise<VisitTypesResponse> =>
  request<VisitTypesResponse>('/visit-types');

export const createVisit = (details: CreateVisitDetails): Promise<unknown> =>
  request<unknown>('/visits', {
    method: 'POST',
    body: JSON.stringify(details),
  });

export const getMyVisits = (): Promise<unknown> => request<unknown>('/visits');

export const cancelVisit = (id: string | number): Promise<unknown> =>
  request<unknown>(`/visits/${encodeURIComponent(id)}/cancel`, { method: 'PATCH' });

export const getVisitPass = (id: string | number): Promise<unknown> =>
  request<unknown>(`/visits/${encodeURIComponent(id)}/qr`);
