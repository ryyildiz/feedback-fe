import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskSidebar from './task-sidebar';
import type { PlanningTask } from '../feedback-planning.types';

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

const defaultProps = {
  tasks: MOCK_TASKS,
  selectedId: MOCK_TASKS[0].id,
  onSelect: vi.fn(),
};

describe('TaskSidebar', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<TaskSidebar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render all tasks', () => {
    render(<TaskSidebar {...defaultProps} />);
    MOCK_TASKS.forEach((task) => {
      expect(screen.getByText(task.title)).toBeTruthy();
    });
  });

  it('should render task count in subtitle', () => {
    render(<TaskSidebar {...defaultProps} />);
    expect(
      screen.getByText(`AI tarafından gruplanmış (${MOCK_TASKS.length})`),
    ).toBeTruthy();
  });

  it('should render task id badges', () => {
    render(<TaskSidebar {...defaultProps} />);
    expect(screen.getByText(`#${MOCK_TASKS[0].id}`)).toBeTruthy();
  });

  it('should call onSelect with correct id when a task is clicked', () => {
    const onSelect = vi.fn();
    render(<TaskSidebar {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText(MOCK_TASKS[1].title));
    expect(onSelect).toHaveBeenCalledWith(MOCK_TASKS[1].id);
  });

  it('should render severities for each task', () => {
    render(<TaskSidebar {...defaultProps} />);
    MOCK_TASKS.forEach((task) => {
      expect(screen.getByText(task.severity)).toBeTruthy();
    });
  });
});
