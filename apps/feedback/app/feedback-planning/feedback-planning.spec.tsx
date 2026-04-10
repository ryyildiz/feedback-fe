import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeedbackPlanning from './feedback-planning';
import { MOCK_PLANNING_TASKS } from './feedback-planning.types';

describe('FeedbackPlanning', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<FeedbackPlanning />);
    expect(baseElement).toBeTruthy();
  });

  it('should render task sidebar with all mock tasks', () => {
    render(<FeedbackPlanning />);
    MOCK_PLANNING_TASKS.forEach((task) => {
      expect(screen.getByText(task.title)).toBeTruthy();
    });
  });

  it('should show first task as active by default', () => {
    render(<FeedbackPlanning />);
    expect(screen.getByDisplayValue(MOCK_PLANNING_TASKS[0].title)).toBeTruthy();
  });

  it('should switch active task when another task is clicked', () => {
    render(<FeedbackPlanning />);
    const secondTask = screen.getByText(MOCK_PLANNING_TASKS[1].title);
    fireEvent.click(secondTask);
    expect(screen.getByDisplayValue(MOCK_PLANNING_TASKS[1].title)).toBeTruthy();
  });
});
