import axios from 'axios';
import type { Feedback, CreateFeedbackRequest, UpdateFeedbackRequest } from '../types';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GET /api/v1/feedbacks
 * Tüm feedback-widget listesini getirir.
 */
export async function getFeedbacks(): Promise<Feedback[]> {
  const response = await api.get<Feedback[]>('/feedbacks');
  return response.data;
}

/**
 * GET /api/v1/feedbacks/:id
 * Tek bir feedback-widget'i id ile getirir.
 */
export async function getFeedbackById(id: number): Promise<Feedback> {
  const response = await api.get<Feedback>(`/feedbacks/${id}`);
  return response.data;
}

/**
 * POST /api/v1/feedbacks
 * Yeni feedback-widget oluşturur.
 * Body: { issueType, screenName, url, feedbackText, createdBy }
 */
export async function createFeedback(data: CreateFeedbackRequest): Promise<Feedback> {
  const response = await api.post<Feedback>('/feedbacks', data);
  return response.data;
}

/**
 * PUT /api/v1/feedbacks/:id
 * Feedback'i günceller.
 * Body: { status?, priority?, isAnalysis? }
 */
export async function updateFeedback(
  id: number,
  data: UpdateFeedbackRequest,
): Promise<Feedback> {
  const response = await api.put<Feedback>(`/feedbacks/${id}`, data);
  return response.data;
}

/**
 * DELETE /api/v1/feedbacks/:id
 * Feedback'i siler.
 */
export async function deleteFeedback(id: number): Promise<void> {
  await api.delete(`/feedbacks/${id}`);
}

/**
 * POST /api/v1/analyses/trigger
 * Gemini analizini tetikler ve analiz sonuçlarını döner.
 */
export async function triggerAnalysis(): Promise<import('../feedback-planning/feedback-planning.types').PlanningTask[]> {
  const response = await api.post<import('../feedback-planning/feedback-planning.types').PlanningTask[]>('/analyses/trigger');
  return response.data;
}

/**
 * GET /api/v1/analyses
 * Tüm analiz sonuçlarını listeler.
 */
export async function getAnalyses(): Promise<import('../feedback-planning/feedback-planning.types').PlanningTask[]> {
  const response = await api.get<import('../feedback-planning/feedback-planning.types').PlanningTask[]>('/analyses');
  return response.data;
}
