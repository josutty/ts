import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  afterEach(cleanup);

  const renderHeader = (overrides: Partial<Parameters<typeof AppHeader>[0]> = {}) => {
    const user = userEvent.setup();
    return {
      user,
      ...render(
        <AppHeader username="admin" activePage="Home" onNavigate={vi.fn()} onSignOut={vi.fn()} {...overrides} />,
      ),
    };
  };

  it('renders the authenticated header and navigation labels in order', () => {
    renderHeader();

    const header = screen.getByRole('banner');
    expect(within(header).getByText('FLEET INTELLIGENCE CENTER')).toBeInTheDocument();
    expect(within(header).getByRole('navigation')).toBeInTheDocument();
    expect(
      within(header)
        .getAllByRole('button')
        .map((button) => button.textContent?.trim()),
    ).toEqual(['Home', 'Drivers Score', 'admin']);
    expect(within(header).getByText('Signed in as')).toBeInTheDocument();
  });

  it('opens the profile menu and exposes its expanded state', async () => {
    const { user } = renderHeader();
    const profileButton = screen.getByRole('button', { name: 'admin' });

    expect(profileButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(profileButton);

    expect(profileButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('navigates to Home and Drivers Score', async () => {
    const onNavigate = vi.fn();
    const { user } = renderHeader({ onNavigate });

    await user.click(screen.getByRole('button', { name: 'Home' }));
    await user.click(screen.getByRole('button', { name: 'Drivers Score' }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'Home');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'Drivers Score');
  });

  it('signs out through the supplied callback', async () => {
    const onSignOut = vi.fn();
    const { user } = renderHeader({ onSignOut });

    await user.click(screen.getByRole('button', { name: 'admin' }));
    await user.click(screen.getByRole('menuitem', { name: '↪ Sign Out' }));

    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it('closes the profile menu on Escape and returns focus to the trigger', async () => {
    const { user } = renderHeader();
    const profileButton = screen.getByRole('button', { name: 'admin' });

    await user.click(profileButton);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(profileButton).toHaveFocus();
  });

  it('closes the profile menu when the pointer is pressed outside', async () => {
    const { user } = renderHeader();

    await user.click(screen.getByRole('button', { name: 'admin' }));
    await user.click(screen.getByRole('banner'));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
