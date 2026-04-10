import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { MainNavbar } from './main-navbar';

const renderNavbar = (props = {}) =>
  render(
    <MemoryRouter>
      <MainNavbar currentRole="user" onRoleChange={vi.fn()} {...props} />
    </MemoryRouter>
  );
describe('MainNavbar', () => {
  it('renders Turkcell brand title', () => {
    renderNavbar();
    expect(screen.getByText('Turkcell')).toBeTruthy();
  });

  it('renders role segments', () => {
    renderNavbar();
    expect(screen.getByText('Müşteri Görünümü')).toBeTruthy();
    expect(screen.getByText('Geri Bildirim Takip')).toBeTruthy();
  });

  it('calls onRoleChange when segment is clicked', async () => {
    const onRoleChange = vi.fn();
    renderNavbar({ onRoleChange });
    await userEvent.click(screen.getByText('Geri Bildirim Takip'));
    expect(onRoleChange).toHaveBeenCalledWith('team');
  });
});
