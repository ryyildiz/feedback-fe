import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeedbackPanel } from './feedback-panel';
import * as feedbackStore from '../../store/feedback.store';

const mockStoreBase = {
  isSubmitted: false,
  lastTicketId: '',
  feedbacks: [],
  formData: { issueType: '', screenName: '', url: '', feedbackText: '', createdBy: '' },
  isLoading: false,
  isSubmitting: false,
  fetchError: null,
  submitError: null,
  fetchFeedbacks: vi.fn(),
  setFormData: vi.fn(),
  resetForm: vi.fn(),
  submitFeedback: vi.fn(),
  updateFeedbackStatus: vi.fn(),
};

beforeEach(() => {
  vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue({ ...mockStoreBase });
});

describe('FeedbackPanel', () => {
  it('renders the panel header title', () => {
    render(<FeedbackPanel onClose={vi.fn()} />);
    expect(screen.getByText('Birlikte Geliştirelim')).toBeTruthy();
  });

  it('renders FeedbackForm when isSubmitted is false', () => {
    render(<FeedbackPanel onClose={vi.fn()} />);
    expect(screen.getByText('Kategori Seçimi')).toBeTruthy();
  });

  it('renders SuccessView when isSubmitted is true', () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue({
      ...mockStoreBase,
      isSubmitted: true,
      lastTicketId: 'TK-9999',
    });
    render(<FeedbackPanel onClose={vi.fn()} />);
    expect(screen.getByText('TK-9999')).toBeTruthy();
    expect(screen.getByText('Harika!')).toBeTruthy();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<FeedbackPanel onClose={onClose} />);
    const closeBtn = screen.getByTestId('panel-close-btn');
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
