import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { ProfileMenu } from './ProfileMenu';

describe('ProfileMenu', () => {
  const renderMenu = (overrides: Partial<Parameters<typeof ProfileMenu>[0]> = {}) =>
    render(<ProfileMenu username="admin" onNavigate={vi.fn()} onSignOut={vi.fn()} onClose={vi.fn()} {...overrides} />);

  it('renders the signed-in label and exact sign-out label', () => {
    renderMenu();

    expect(screen.getByText('Signed in as')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: '↪ Sign Out' })).toBeInTheDocument();
  });

  it('calls the sign-out callback from the menu item', async () => {
    const onSignOut = vi.fn();
    const user = userEvent.setup();
    renderMenu({ onSignOut });

    await user.click(screen.getByRole('menuitem', { name: '↪ Sign Out' }));

    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it('calls navigation callbacks for Home and Drivers Score', async () => {
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    renderMenu({ onNavigate });

    await user.click(screen.getByRole('menuitem', { name: 'Home' }));
    await user.click(screen.getByRole('menuitem', { name: 'Drivers Score' }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'Home');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'Drivers Score');
  });

  it('closes when Escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderMenu({ onClose });

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps menu content available for keyboard navigation', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.keyboard('{Home}');
    expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Drivers Score' })).toBeInTheDocument();
  });
});
