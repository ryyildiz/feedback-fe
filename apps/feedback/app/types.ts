// ---------- Temel enum'lar (API sözleşmesi ile bire bir) ----------

/** POST /feedbacks → issueType değerleri */
export type IssueType = 'BUG' | 'PERFORMANCE' | 'DESIGN' | 'SUGGESTION';

/** PUT /feedbacks/:id → status değerleri */
export type FeedbackStatus =
  | 'AWAITING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CANCELLED';

/** PUT /feedbacks/:id → priority değerleri */
export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type Sentiment = 'positive' | 'neutral' | 'negative' | 'frustrated';

// ---------- API Modelleri ----------

/** GET /feedbacks veya GET /feedbacks/:id yanıtı */
export interface Feedback {
  id: number;
  issueType: IssueType;
  screenName: string;
  url: string;
  feedbackText: string;
  status: FeedbackStatus;
  createdBy: string;
  createdAt?: string;
  priority?: Priority;
  isAnalysis?: boolean;
}

/** POST /feedbacks istek gövdesi */
export interface CreateFeedbackRequest {
  issueType: IssueType;
  screenName: string;
  url: string;
  feedbackText: string;
  createdBy: string;
}

/** PUT /feedbacks/:id istek gövdesi */
export interface UpdateFeedbackRequest {
  status?: FeedbackStatus;
  priority?: Priority;
  isAnalysis?: boolean;
}

// ---------- Analysis API Tipleri ----------

/** POST /api/v1/analyses/trigger — istek gövdesi */
export interface TriggerAnalysisRequest {
  feedbackIds: number[];
}

/** POST /api/v1/analyses/trigger — yanıt */
export interface TriggerAnalysisResponse {
  message: string;
  triggeredCount: number;
}

// ---------- UI Yardımcı Tipleri ----------

export type Role = 'user' | 'team';
