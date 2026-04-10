import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FeedbackPanel } from './feedback-panel';

const defaultProps = {
  isSubmitted: false,
  lastTicketId: '',
  formData: { topic: '', feedback: '' },
  onClose: vi.fn(),
  onChange: vi.fn(),
  onSubmit: vi.fn(),
};

describe('FeedbackPanel', () => {
  it('renders the panel header title', () => {
    render(<FeedbackPanel {...defaultProps} />);
    expect(screen.getByText('Birlikte Geliştirelim')).toBeTruthy();
  });

  it('renders FeedbackForm when isSubmitted is false', () => {
    render(<FeedbackPanel {...defaultProps} />);
    expect(screen.getByText('Kategori Seçimi')).toBeTruthy();
  });

  it('renders SuccessView when isSubmitted is true', () => {
    render(<FeedbackPanel {...defaultProps} isSubmitted lastTicketId="TK-9999" />);
    expect(screen.getByText('TK-9999')).toBeTruthy();
    expect(screen.getByText('Harika!')).toBeTruthy();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<FeedbackPanel {...defaultProps} onClose={onClose} />);
    const closeBtn = screen.getByTestId('panel-close-btn');
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
