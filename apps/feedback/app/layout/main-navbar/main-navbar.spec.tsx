import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MainNavbar } from './main-navbar';

describe('MainNavbar', () => {
  it('renders Turkcell brand title', () => {
    render(<MainNavbar currentRole="user" onRoleChange={vi.fn()} />);
    expect(screen.getByText('Turkcell')).toBeTruthy();
  });

  it('renders role segments', () => {
    render(<MainNavbar currentRole="user" onRoleChange={vi.fn()} />);
    expect(screen.getByText('Müşteri Görünümü')).toBeTruthy();
    expect(screen.getByText('Teknik Ekip Havuzu')).toBeTruthy();
  });

  it('renders admin info', () => {
    render(<MainNavbar currentRole="user" onRoleChange={vi.fn()} />);
    expect(screen.getByText('Admin Paneli')).toBeTruthy();
    expect(screen.getByText('v2.4.0 Stable')).toBeTruthy();
  });

  it('calls onRoleChange when segment is clicked', async () => {
    const onRoleChange = vi.fn();
    render(<MainNavbar currentRole="user" onRoleChange={onRoleChange} />);
    await userEvent.click(screen.getByText('Teknik Ekip Havuzu'));
    expect(onRoleChange).toHaveBeenCalledWith('team');
  });
});
