import { create } from 'zustand';
import type {
  Feedback,
  CreateFeedbackRequest,
  UpdateFeedbackRequest,
  FeedbackStatus,
  IssueType,
} from '../types';
import {
  getFeedbacks,
  createFeedback,
  updateFeedback,
} from '../services/feedback.service';

// Form için UI drafter tipi — issueType başlangıçta seçilmemiş olabilir
export type FeedbackDraft = Omit<CreateFeedbackRequest, 'issueType'> & {
  issueType: IssueType | '';
};

const EMPTY_DRAFT: FeedbackDraft = {
  issueType: '',
  screenName: '',
  url: '',
  feedbackText: '',
  createdBy: '',
};

interface FeedbackState {
  // --- Veri ---
  feedbacks: Feedback[];
  formData: FeedbackDraft;
  lastTicketId: string;

  // --- Durum bayrakları ---
  isLoading: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  fetchError: string | null;
  submitError: string | null;

  // --- Aksiyonlar ---

  /** Tüm geri bildirimleri API'den çeker */
  fetchFeedbacks: () => Promise<void>;

  /** Form alanlarını kısmen günceller */
  setFormData: (patch: Partial<FeedbackDraft>) => void;

  /** Formu sıfırlar (panel kapanınca çağrılır) */
  resetForm: () => void;

  /** POST /api/v1/feedbacks — yeni geri bildirim gönderir */
  submitFeedback: () => Promise<void>;

  /** PUT /api/v1/feedbacks/:id — durum/öncelik günceller */
  updateFeedbackStatus: (id: number, status: FeedbackStatus) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbacks: [],
  formData: { ...EMPTY_DRAFT },
  lastTicketId: '',
  isLoading: false,
  isSubmitting: false,
  isSubmitted: false,
  fetchError: null,
  submitError: null,

  // ----------------------------------------------------------------
  fetchFeedbacks: async () => {
    set({ isLoading: true, fetchError: null });
    try {
      const data = await getFeedbacks();
      set({ feedbacks: data });
    } catch {
      set({ fetchError: 'Geri bildirimler yüklenirken bir hata oluştu.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // ----------------------------------------------------------------
  setFormData: (patch) =>
    set((state) => ({ formData: { ...state.formData, ...patch } })),

  // ----------------------------------------------------------------
  resetForm: () =>
    set({ formData: { ...EMPTY_DRAFT }, isSubmitted: false, submitError: null }),

  // ----------------------------------------------------------------
  submitFeedback: async () => {
    const { formData } = get();
    if (!formData.issueType || !formData.feedbackText) return;

    set({ isSubmitting: true, submitError: null });
    try {
      const payload: CreateFeedbackRequest = {
        issueType: formData.issueType as IssueType,
        screenName: formData.screenName,
        url: formData.url,
        feedbackText: formData.feedbackText,
        createdBy: formData.createdBy,
      };

      const created = await createFeedback(payload);
      set((state) => ({
        feedbacks: [created, ...state.feedbacks],
        isSubmitted: true,
        lastTicketId: created.ticketId ?? String(created.id),
      }));
      get().fetchFeedbacks();
    } catch {
      set({ submitError: 'Gönderi sırasında bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ----------------------------------------------------------------
  updateFeedbackStatus: async (id, status) => {
    // Optimistik güncelleme
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, status } : f,
      ),
    }));
    try {
      const body: UpdateFeedbackRequest = { status };
      const updated = await updateFeedback(id, body);
      set((state) => ({
        feedbacks: state.feedbacks.map((f) => (f.id === updated.id ? updated : f)),
      }));
    } catch {
      // Hata durumunda geri al — tekrar fetch
      get().fetchFeedbacks();
    }
  },
}));
