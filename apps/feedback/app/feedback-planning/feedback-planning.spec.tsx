import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FeedbackPlanning from './feedback-planning';
import * as service from '../services/feedback.service';
import type { PlanningTask } from './feedback-planning.types';

const MOCK_TASKS: PlanningTask[] = [
  {
    id: 1, title: 'Ödeme Butonu Pasif Kalıyor', description: 'Açıklama 1',
    screenName: 'Payment', issueType: 'BUG', referenceTicketIds: ['TK-001'],
    referenceFeedbackIds: [1], tag: 'FRONTEND', severity: 'CRITICAL',
    status: 'COMPLETED', analyzedAt: '', createdAt: '', updatedAt: '',
  },
  {
    id: 2, title: 'Paket Aşım Görseli Hatalı', description: 'Açıklama 2',
    screenName: 'Dashboard', issueType: 'UX', referenceTicketIds: ['TK-002'],
    referenceFeedbackIds: [2], tag: 'FRONTEND', severity: 'HIGH',
    status: 'COMPLETED', analyzedAt: '', createdAt: '', updatedAt: '',
  },
];

vi.spyOn(service, 'getAnalyses').mockResolvedValue(MOCK_TASKS);

describe('FeedbackPlanning', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<FeedbackPlanning />);
    expect(baseElement).toBeTruthy();
  });

  it('should render task sidebar with all mock tasks', async () => {
    render(<FeedbackPlanning />);
    for (const task of MOCK_TASKS) {
      expect(await screen.findByText(task.title)).toBeTruthy();
    }
  });

  it('should show first task as active by default', async () => {
    render(<FeedbackPlanning />);
    expect(await screen.findByDisplayValue(MOCK_TASKS[0].title)).toBeTruthy();
  });

  it('should switch active task when another task is clicked', async () => {
    render(<FeedbackPlanning />);
    const secondTask = await screen.findByText(MOCK_TASKS[1].title);
    fireEvent.click(secondTask);
    expect(await screen.findByDisplayValue(MOCK_TASKS[1].title)).toBeTruthy();
  });
});
