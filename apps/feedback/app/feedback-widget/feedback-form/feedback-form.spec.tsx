import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as feedbackStore from '../../store/feedback.store';
import { FeedbackForm } from './feedback-form';

const mockSetFormData = vi.fn();
const mockSubmitFeedback = vi.fn();

const makeStore = (overrides = {}) => ({
  formData: { issueType: '', feedbackText: '', url: '', createdBy: '', screenName: '' },
  setFormData: mockSetFormData,
  submitFeedback: mockSubmitFeedback,
  isSubmitting: false,
  submitError: null,
  ...overrides,
});

describe('FeedbackForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tüm kategori kartlarını render eder', () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue(makeStore() as never);
    render(<FeedbackForm />);
    expect(screen.getByText('Hata')).toBeTruthy();
    expect(screen.getByText('Tasarım')).toBeTruthy();
    expect(screen.getByText('Hız')).toBeTruthy();
    expect(screen.getByText('Öneri')).toBeTruthy();
  });

  it('form boşken gönder butonu disabled olur', () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue(makeStore() as never);
    render(<FeedbackForm />);
    const btn = screen.getByRole('button', { name: /HEMEN GÖNDER/i });
    expect(btn).toHaveAttribute('disabled');
  });

  it('kategori kartına tıklayınca setFormData çağrılır', async () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue(makeStore() as never);
    render(<FeedbackForm />);
    await userEvent.click(screen.getByText('Hata'));
    expect(mockSetFormData).toHaveBeenCalledWith({ issueType: 'BUG' });
  });

  it('kategori ve görüş dolu iken gönder butonu aktif olur', () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue(
      makeStore({ formData: { issueType: 'BUG', feedbackText: 'Bir hata var', url: '', createdBy: '', screenName: '' } }) as never,
    );
    render(<FeedbackForm />);
    const btn = screen.getByRole('button', { name: /HEMEN GÖNDER/i });
    expect(btn).not.toHaveAttribute('disabled');
  });

  it('gönder butonuna tıklayınca submitFeedback çağrılır', async () => {
    vi.spyOn(feedbackStore, 'useFeedbackStore').mockReturnValue(
      makeStore({ formData: { issueType: 'SUGGESTION', feedbackText: 'Güzel öneri', url: '', createdBy: '', screenName: '' } }) as never,
    );
    render(<FeedbackForm />);
    await userEvent.click(screen.getByRole('button', { name: /HEMEN GÖNDER/i }));
    expect(mockSubmitFeedback).toHaveBeenCalledOnce();
  });
});

