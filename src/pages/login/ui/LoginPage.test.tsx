import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders one main landmark and the page heading', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Smarter journeys. Clearer insights.' })).toBeInTheDocument();
  });

  it('renders the exact login labels in order', () => {
    renderWithProviders(<LoginPage />);

    const text = Array.from(document.querySelectorAll('h1, h2, p, label, button'))
      .map((element) => element.textContent?.trim())
      .filter((value): value is string => Boolean(value));

    expect(text).toEqual([
      'Smarter journeys. Clearer insights.',
      'An intuitive way to explore Eicher vehicles, monitor a trip and understand driver performance.',
      'Prototype access only. No real account verification or live vehicle data is connected.',
      'Welcome back',
      'Sign in',
      'Use demo credentials to explore the experience. Real authentication is not enabled.',
      'Username',
      'Password',
      'Demo credentials: admin / admin123. This is not a secure production login.',
      'Sign In →',
    ]);
  });

  it('wires submitted credentials to the login callback', async () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    const { user } = renderWithProviders(<LoginPage onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'admin123');
    await user.click(screen.getByRole('button', { name: 'Sign In →' }));

    expect(onSubmit).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' });
  });

  it('renders the busy state and authentication error', () => {
    renderWithProviders(<LoginPage isSubmitting error="Unable to sign in. Please try again." />);

    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('Unable to sign in. Please try again.');
  });
});
