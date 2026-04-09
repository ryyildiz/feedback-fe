export interface Feedback {
  id: string;
  topic: string;
  screenName: string;
  url: string;
  feedback: string;
  status: 'awaiting' | 'backlog' | 'resolved' | 'canceled';
  date: string;
}

export interface FeedbackFormData {
  topic: string;
  feedback: string;
}

export type Role = 'user' | 'team';
