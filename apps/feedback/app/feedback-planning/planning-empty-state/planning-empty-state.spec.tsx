import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as feedbackService from '../../services/feedback.service';
import { PlanningEmptyState } from './planning-empty-state';

const mockOnGoBack = vi.fn();
const mockOnAnalysisComplete = vi.fn();

const defaultProps = {
  onGoBack: mockOnGoBack,
  onAnalysisComplete: mockOnAnalysisComplete,
};

describe('PlanningEmptyState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('başlık ve açıklamayı render eder', () => {
    render(<PlanningEmptyState {...defaultProps} />);
    expect(screen.getByText('Planlama Havuzu Henüz Boş')).toBeTruthy();
    expect(screen.getByText(/Henüz AI tarafından analiz edilmiş/)).toBeTruthy();
  });

  it('"Deneyim Havuzuna Dön" butonuna tıklayınca onGoBack çağrılır', () => {
    render(<PlanningEmptyState {...defaultProps} />);
    fireEvent.click(screen.getByText('Deneyim Havuzuna Dön'));
    expect(mockOnGoBack).toHaveBeenCalledTimes(1);
  });

  it('"AI Analizi Başlat" butonuna tıklayınca triggerAnalysis servisi çağrılır', async () => {
    const mockTasks = [{ id: 1, title: 'Task 1' }];
    vi.spyOn(feedbackService, 'triggerAnalysis').mockResolvedValueOnce(mockTasks as never);

    render(<PlanningEmptyState {...defaultProps} />);
    fireEvent.click(screen.getByText('AI Analizi Başlat'));

    await waitFor(() => {
      expect(feedbackService.triggerAnalysis).toHaveBeenCalledTimes(1);
      expect(mockOnAnalysisComplete).toHaveBeenCalledWith(mockTasks);
    });
  });

  it('triggerAnalysis hata verince onAnalysisComplete çağrılmaz', async () => {
    vi.spyOn(feedbackService, 'triggerAnalysis').mockRejectedValueOnce(new Error('fail'));

    render(<PlanningEmptyState {...defaultProps} />);
    fireEvent.click(screen.getByText('AI Analizi Başlat'));

    await waitFor(() => {
      expect(mockOnAnalysisComplete).not.toHaveBeenCalled();
    });
  });
});
