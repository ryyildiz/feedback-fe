import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { MainLayout } from './main-layout';

// ── Store mock ─────────────────────────────────────────────────────────────
const mockFetchFeedbacks = vi.fn();
const mockSetFormData = vi.fn();
const mockResetForm = vi.fn();
const mockUpdateFeedbackStatus = vi.fn();

vi.mock('../../store/feedback-widget.store', () => ({
  useFeedbackStore: () => ({
    feedbacks: [],
    isLoading: false,
    fetchError: null,
    setFormData: mockSetFormData,
    resetForm: mockResetForm,
    fetchFeedbacks: mockFetchFeedbacks,
    updateFeedbackStatus: mockUpdateFeedbackStatus,
  }),
}));

// ── Child component mocks ──────────────────────────────────────────────────
vi.mock('../main-navbar/main-navbar', () => ({
  MainNavbar: ({ currentRole, onRoleChange }: { currentRole: string; onRoleChange: (r: string) => void }) => (
    <div>
      <span data-testid="current-role">{currentRole}</span>
      <button onClick={() => onRoleChange('user')}>Müşteri Görünümü</button>
      <button onClick={() => onRoleChange('team')}>Geri Bildirim Takip</button>
    </div>
  ),
}));

vi.mock('../../feedback-widget/feedback-widget-fab/feedback-widget-fab', () => ({
  FeedbackFab: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-testid="feedback-fab">
      FİKRİNİ PAYLAŞ
    </button>
  ),
}));

vi.mock('../../feedback-widget/feedback-widget-panel/feedback-widget-panel', () => ({
  FeedbackPanel: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="feedback-panel">
      <button onClick={onClose} data-testid="panel-close-btn">Kapat</button>
    </div>
  ),
}));

vi.mock('../../feedback-widget-board/feedback-widget-board', () => ({
  FeedbackBoard: () => <div data-testid="feedback-board">FeedbackBoard</div>,
}));

// ── Helpers ────────────────────────────────────────────────────────────────
const renderLayout = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <MainLayout />
    </MemoryRouter>
  );

// ── Tests ──────────────────────────────────────────────────────────────────
describe('MainLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state – user role', () => {
    it('renders hero section for the root path', () => {
      renderLayout('/');
      expect(screen.getByText('Ana Sayfa')).toBeTruthy();
    });

    it('renders correct title for /fatura', () => {
      renderLayout('/fatura');
      expect(screen.getByText('Fatura Merkezi')).toBeTruthy();
    });

    it('renders correct title for /paketlerim', () => {
      renderLayout('/paketlerim');
      expect(screen.getByText('Paketlerim')).toBeTruthy();
    });

    it('renders FeedbackFab in user mode', () => {
      renderLayout('/');
      expect(screen.getByTestId('feedback-widget-fab')).toBeTruthy();
    });

    it('does NOT render TeamView in user mode', () => {
      renderLayout('/');
      expect(screen.queryByTestId('feedback-widget-board')).toBeNull();
    });

    it('does NOT call fetchFeedbacks on mount', () => {
      renderLayout('/');
      expect(mockFetchFeedbacks).not.toHaveBeenCalled();
    });
  });

  describe('panel open / close', () => {
    it('opens FeedbackPanel and hides FAB when FAB is clicked', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByTestId('feedback-widget-fab'));
      expect(screen.getByTestId('feedback-widget-panel')).toBeTruthy();
      expect(screen.queryByTestId('feedback-widget-fab')).toBeNull();
    });

    it('calls setFormData when FAB is clicked', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByTestId('feedback-widget-fab'));
      expect(mockSetFormData).toHaveBeenCalledWith(
        expect.objectContaining({ screenName: 'Ana Sayfa' })
      );
    });

    it('closes the panel and shows FAB when onClose is triggered', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByTestId('feedback-widget-fab'));
      await userEvent.click(screen.getByTestId('panel-close-btn'));
      expect(screen.queryByTestId('feedback-widget-panel')).toBeNull();
      expect(screen.getByTestId('feedback-widget-fab')).toBeTruthy();
    });
  });

  describe('role switching', () => {
    it('switches to team role and shows FeedbackBoard', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByText('Geri Bildirim Takip'));
      expect(screen.getByTestId('feedback-widget-board')).toBeTruthy();
    });

    it('calls fetchFeedbacks when switching to team role', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByText('Geri Bildirim Takip'));
      expect(mockFetchFeedbacks).toHaveBeenCalledOnce();
    });

    it('does NOT call fetchFeedbacks when switching back to user role', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByText('Geri Bildirim Takip'));
      vi.clearAllMocks();
      await userEvent.click(screen.getByText('Müşteri Görünümü'));
      expect(mockFetchFeedbacks).not.toHaveBeenCalled();
    });

    it('hides FeedbackFab in team mode', async () => {
      renderLayout('/');
      await userEvent.click(screen.getByText('Geri Bildirim Takip'));
      expect(screen.queryByTestId('feedback-widget-fab')).toBeNull();
    });
  });
});
