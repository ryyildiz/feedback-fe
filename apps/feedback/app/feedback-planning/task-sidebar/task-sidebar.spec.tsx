import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskSidebar from './task-sidebar';
import { MOCK_PLANNING_TASKS } from '../feedback-planning.types';

const defaultProps = {
  tasks: MOCK_PLANNING_TASKS,
  selectedId: MOCK_PLANNING_TASKS[0].id,
  onSelect: vi.fn(),
};

describe('TaskSidebar', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<TaskSidebar {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render all tasks', () => {
    render(<TaskSidebar {...defaultProps} />);
    MOCK_PLANNING_TASKS.forEach((task) => {
      expect(screen.getByText(task.title)).toBeTruthy();
    });
  });

  it('should render task count in subtitle', () => {
    render(<TaskSidebar {...defaultProps} />);
    expect(
      screen.getByText(`AI tarafından gruplanmış (${MOCK_PLANNING_TASKS.length})`),
    ).toBeTruthy();
  });

  it('should render task id badges', () => {
    render(<TaskSidebar {...defaultProps} />);
    expect(screen.getByText(`#${MOCK_PLANNING_TASKS[0].id}`)).toBeTruthy();
  });

  it('should call onSelect with correct id when a task is clicked', () => {
    const onSelect = vi.fn();
    render(<TaskSidebar {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText(MOCK_PLANNING_TASKS[1].title));
    expect(onSelect).toHaveBeenCalledWith(MOCK_PLANNING_TASKS[1].id);
  });

  it('should render severities for each task', () => {
    render(<TaskSidebar {...defaultProps} />);
    MOCK_PLANNING_TASKS.forEach((task) => {
      expect(screen.getByText(task.severity)).toBeTruthy();
    });
  });
});
