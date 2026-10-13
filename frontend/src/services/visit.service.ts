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

export type VisitStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'checked_in'
  | 'completed'
  | 'cancelled';

export interface Visit {
  id: string;
  status: VisitStatus;
  visit_type_name: string;
  visit_date: string;
  purpose: string | null;
}

interface CreateVisitResponse {
  visit: Pick<Visit, 'id' | 'status' | 'visit_date' | 'purpose'>;
}

interface VisitResponse {
  visit: Visit;
}

export interface VisitPassResponse extends VisitResponse {
  qrDataUrl: string;
}

export const getVisitTypes = (): Promise<VisitTypesResponse> =>
  request<VisitTypesResponse>('/visit-types');

export const createVisit = (details: CreateVisitDetails): Promise<CreateVisitResponse> =>
  request<CreateVisitResponse>('/visits', {
    method: 'POST',
    body: JSON.stringify(details),
  });

export const getMyVisits = (): Promise<unknown> => request<unknown>('/visits');

export const getVisit = (id: string): Promise<VisitResponse> =>
  request<VisitResponse>(`/visits/${encodeURIComponent(id)}`);

export const cancelVisit = (id: string | number): Promise<unknown> =>
  request<unknown>(`/visits/${encodeURIComponent(id)}/cancel`, { method: 'PATCH' });

export const getVisitPass = (id: string | number): Promise<VisitPassResponse> =>
  request<VisitPassResponse>(`/visits/${encodeURIComponent(id)}/qr`);
