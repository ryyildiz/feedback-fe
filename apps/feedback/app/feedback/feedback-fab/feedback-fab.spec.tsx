import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FeedbackFab } from './feedback-fab';

describe('FeedbackFab', () => {
  it('renders the FAB button text', () => {
    render(<FeedbackFab onClick={vi.fn()} />);
    expect(screen.getByText('FİKRİNİ PAYLAŞ')).toBeTruthy();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<FeedbackFab onClick={onClick} />);
    await userEvent.click(screen.getByText('FİKRİNİ PAYLAŞ'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
