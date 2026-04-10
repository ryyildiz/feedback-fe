import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JiraEditor from './jira-editor';
import { MOCK_PLANNING_TASKS } from '../feedback-planning.types';

const task = MOCK_PLANNING_TASKS[0];
const defaultProps = {
  task,
  onUpdate: vi.fn(),
};

describe('JiraEditor', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<JiraEditor {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display task title in input', () => {
    render(<JiraEditor {...defaultProps} />);
    expect(screen.getByDisplayValue(task.title)).toBeTruthy();
  });

  it('should display task description', () => {
    render(<JiraEditor {...defaultProps} />);
    expect(screen.getByText(task.description)).toBeTruthy();
  });

  it('should show reference ticket count', () => {
    render(<JiraEditor {...defaultProps} />);
    expect(
      screen.getByText(`Referans Müşteri Talepleri (${task.referenceTicketIds.length})`),
    ).toBeTruthy();
  });

  it('should render each reference ticket id', () => {
    render(<JiraEditor {...defaultProps} />);
    task.referenceTicketIds.forEach((id) => {
      expect(screen.getByText(id)).toBeTruthy();
    });
  });

  it('should call onUpdate with title field when input changes', () => {
    const onUpdate = vi.fn();
    render(<JiraEditor {...defaultProps} onUpdate={onUpdate} />);
    const input = screen.getByDisplayValue(task.title);
    fireEvent.change(input, { target: { value: 'Yeni Başlık' } });
    expect(onUpdate).toHaveBeenCalledWith('title', 'Yeni Başlık');
  });
});
