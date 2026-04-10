import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SuccessView } from './success-view';

describe('SuccessView', () => {
  it('renders the success title', () => {
    render(<SuccessView ticketId="TK-1234" onClose={vi.fn()} />);
    expect(screen.getByText('Harika!')).toBeTruthy();
  });

  it('displays the given ticket ID', () => {
    render(<SuccessView ticketId="TK-5678" onClose={vi.fn()} />);
    expect(screen.getByText('TK-5678')).toBeTruthy();
  });

  it('renders the close button', () => {
    render(<SuccessView ticketId="TK-1234" onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: /KAPAT/i })).toBeTruthy();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<SuccessView ticketId="TK-1234" onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /KAPAT/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
