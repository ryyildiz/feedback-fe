import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { Feedback } from '../../types';
import { TeamView } from './team-view';

const mockFeedbacks: Feedback[] = [
  {
    id: 'TK-0001',
    topic: 'Hata',
    screenName: 'Ana Sayfa',
    url: '/home',
    feedback: 'Buton çalışmıyor.',
    status: 'awaiting',
    date: '01.04.2025',
  },
  {
    id: 'TK-0002',
    topic: 'Öneri',
    screenName: 'Profil',
    url: '/profil',
    feedback: 'Karanlık mod eklenebilir.',
    status: 'resolved',
    date: '02.04.2025',
  },
];

describe('TeamView', () => {
  it('renders section title', () => {
    render(<TeamView feedbacks={mockFeedbacks} onUpdateStatus={vi.fn()} />);
    expect(screen.getByText('Talepler ve Aksiyonlar')).toBeTruthy();
  });

  it('shows total feedback count', () => {
    render(<TeamView feedbacks={mockFeedbacks} onUpdateStatus={vi.fn()} />);
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('shows pending feedback count', () => {
    render(<TeamView feedbacks={mockFeedbacks} onUpdateStatus={vi.fn()} />);
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders each feedback row by ID', () => {
    render(<TeamView feedbacks={mockFeedbacks} onUpdateStatus={vi.fn()} />);
    expect(screen.getByText('TK-0001')).toBeTruthy();
    expect(screen.getByText('TK-0002')).toBeTruthy();
  });

  it('renders screen names in the table', () => {
    render(<TeamView feedbacks={mockFeedbacks} onUpdateStatus={vi.fn()} />);
    expect(screen.getByText('Ana Sayfa')).toBeTruthy();
    expect(screen.getByText('Profil')).toBeTruthy();
  });
});
