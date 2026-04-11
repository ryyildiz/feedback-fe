import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Feedback } from '../types';
import { FeedbackBoard } from './feedback-board';

const mockFeedbacks: Feedback[] = [
  {
    id: 1,
    ticketId: 'TK-A1B2C3D1',
    issueType: 'BUG',
    screenName: 'Ana Sayfa',
    url: '/home',
    feedbackText: 'Buton çalışmıyor.',
    status: 'AWAITING',
    createdBy: 'usr-tc-001',
    isAnalysis: false,
  },
  {
    id: 2,
    ticketId: 'TK-A1B2C3D2',
    issueType: 'SUGGESTION',
    screenName: 'Profil',
    url: '/paketlerim',
    feedbackText: 'Karanlık mod eklenebilir.',
    status: 'RESOLVED',
    createdBy: 'usr-tc-002',
    isAnalysis: true,
  },
];

describe('FeedbackBoard', () => {
  it('renders section title', () => {
    render(<FeedbackBoard feedbacks={mockFeedbacks} />);
    expect(screen.getByText('Geri Bildirim Yönetimi')).toBeTruthy();
  });

  it('shows total feedback-widget count', () => {
    render(<FeedbackBoard feedbacks={mockFeedbacks} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('shows pending feedback-widget count', () => {
    render(<FeedbackBoard feedbacks={mockFeedbacks} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders each feedback-widget row by ticketId', () => {
    render(<FeedbackBoard feedbacks={mockFeedbacks} />);
    expect(screen.getByText('TK-A1B2C3D1')).toBeTruthy();
    expect(screen.getByText('TK-A1B2C3D2')).toBeTruthy();
  });

  it('renders screen names in the table', () => {
    render(<FeedbackBoard feedbacks={mockFeedbacks} />);
    expect(screen.getByText('Ana Sayfa')).toBeTruthy();
    expect(screen.getByText('Profil')).toBeTruthy();
  });
});
