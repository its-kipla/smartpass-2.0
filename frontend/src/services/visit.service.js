import { request } from './api.js';

export const getVisitTypes = () => request('/visit-types');

export const createVisit = (details) =>
  request('/visits', {
    method: 'POST',
    body: JSON.stringify(details),
  });

export const getMyVisits = () => request('/visits');

export const cancelVisit = (id) =>
  request(`/visits/${encodeURIComponent(id)}/cancel`, { method: 'PATCH' });

export const getVisitPass = (id) =>
  request(`/visits/${encodeURIComponent(id)}/qr`);
