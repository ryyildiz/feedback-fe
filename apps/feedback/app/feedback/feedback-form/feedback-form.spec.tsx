import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FeedbackForm } from './feedback-form';

const emptyForm = { issueType: '', feedback: '', capturedUrl: 'http://localhost/', userId: 'user-test' };

describe('FeedbackForm', () => {
  it('renders all topic cards', () => {
    render(<FeedbackForm formData={emptyForm} onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByText('Hata')).toBeTruthy();
    expect(screen.getByText('Tasarım')).toBeTruthy();
    expect(screen.getByText('Hız')).toBeTruthy();
    expect(screen.getByText('Öneri')).toBeTruthy();
  });

  it('submit button is disabled when form is empty', () => {
    render(<FeedbackForm formData={emptyForm} onChange={vi.fn()} onSubmit={vi.fn()} />);
    const btn = screen.getByRole('button', { name: /HEMEN GÖNDER/i });
    expect(btn).toHaveAttribute('disabled');
  });

  it('calls onChange with selected topic when a card is clicked', async () => {
    const onChange = vi.fn();
    render(<FeedbackForm formData={emptyForm} onChange={onChange} onSubmit={vi.fn()} />);
    await userEvent.click(screen.getByText('Hata'));
    expect(onChange).toHaveBeenCalledWith({ issueType: 'hata', feedback: '', capturedUrl: 'http://localhost/', userId: 'user-test' });
  });

  it('submit button is enabled when both topic and feedback are filled', () => {
    render(
      <FeedbackForm
        formData={{ issueType: 'hata', feedback: 'Bir hata var', capturedUrl: 'http://localhost/', userId: 'user-test' }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );
    const btn = screen.getByRole('button', { name: /HEMEN GÖNDER/i });
    expect(btn).not.toHaveAttribute('disabled');
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const onSubmit = vi.fn();
    render(
      <FeedbackForm
        formData={{ issueType: 'oneri', feedback: 'Güzel öneri', capturedUrl: 'http://localhost/', userId: 'user-test' }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: /HEMEN GÖNDER/i }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
