import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActionPanel from './action-panel';
import { TEAM_OPTIONS } from '../feedback-planning.types';
import type { PlanningTask } from '../feedback-planning.types';

const task: PlanningTask = {
  id: 1, title: 'Ödeme Butonu Pasif Kalıyor',
  description: "Kullanıcılar 'Öde' butonunun tıklanamaz durumda kaldığını raporluyor.",
  screenName: 'Payment', issueType: 'BUG',
  referenceTicketIds: ['TK-A1B2'], referenceFeedbackIds: [1],
  tag: 'FRONTEND', severity: 'CRITICAL',
  status: 'COMPLETED', analyzedAt: '', createdAt: '', updatedAt: '',
};
const defaultProps = { task, team: TEAM_OPTIONS[0].value, onTeamChange: vi.fn(), onCreate: vi.fn() };

describe('ActionPanel', () => {
  it('should render without crashing', () => {
    const { baseElement } = render(<ActionPanel {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render JIRA task creation button', () => {
    render(<ActionPanel {...defaultProps} />);
    expect(screen.getByText('JIRA TASK OLUŞTUR')).toBeTruthy();
  });

  it('should display matched screen name in alert', () => {
    render(<ActionPanel {...defaultProps} />);
    expect(
      screen.getByText(task.screenName.toUpperCase(), { exact: false }),
    ).toBeTruthy();
  });

  it('should call onCreate when JIRA button is clicked', () => {
    const onCreate = vi.fn();
    render(<ActionPanel {...defaultProps} onCreate={onCreate} />);
    fireEvent.click(screen.getByText('JIRA TASK OLUŞTUR'));
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
