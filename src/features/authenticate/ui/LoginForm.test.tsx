import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '@mocks/node';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { LoginForm } from './LoginForm';

const loginResponse = {
  accessToken: 'demo-token',
  user: { id: 'demo-user', username: 'admin', role: 'admin' },
};

describe('LoginForm', () => {
  it('renders the exact demo copy and labels in order', () => {
    renderWithProviders(<LoginForm />);

    const form = screen.getByRole('form', { name: 'Sign in' });
    const copy = [
      'Welcome back',
      'Sign in',
      'Use demo credentials to explore the experience. Real authentication is not enabled.',
      'Username',
      'Password',
      'Demo credentials: admin / admin123. This is not a secure production login.',
      'Sign In →',
    ];
    const text = form.textContent ?? '';
    let previousIndex = -1;

    for (const label of copy) {
      const index = text.indexOf(label);
      expect(index, `missing label: ${label}`).toBeGreaterThan(previousIndex);
      previousIndex = index;
    }
  });

  it('shows linked username and password validation errors without submitting', async () => {
    const user = userEvent.setup();
    const request = vi.fn();
    server.use(
      http.post('*/auth/login', async ({ request: incomingRequest }) => {
        request(await incomingRequest.json());
        return HttpResponse.json(loginResponse);
      }),
    );
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Sign In →' }));

    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');
    expect(username).toHaveAttribute('aria-invalid', 'true');
    expect(password).toHaveAttribute('aria-invalid', 'true');
    expect(username).toHaveAccessibleDescription(/required|username/i);
    expect(password).toHaveAccessibleDescription(/required|password/i);
    expect(request).not.toHaveBeenCalled();
  });

  it('submits valid credentials through the login mutation', async () => {
    const user = userEvent.setup();
    const request = vi.fn();
    server.use(
      http.post('*/auth/login', async ({ request: incomingRequest }) => {
        request(await incomingRequest.json());
        return HttpResponse.json(loginResponse);
      }),
    );
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'admin123');
    await user.click(screen.getByRole('button', { name: 'Sign In →' }));

    expect(request).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' });
  });

  it('shows a safe rejected-login alert and offers retry', async () => {
    const user = userEvent.setup();
    server.use(
      http.post('*/auth/login', () => HttpResponse.json({ message: 'database password leaked' }, { status: 401 })),
    );
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText('Username'), 'wrong');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign In →' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/unable to sign in|something went wrong|try again/i);
    expect(alert).not.toHaveTextContent('database password leaked');
    expect(within(alert).getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('disables the submit button while the login mutation is loading', async () => {
    const user = userEvent.setup();
    server.use(
      http.post('*/auth/login', async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json(loginResponse);
      }),
    );
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'admin123');
    const submit = screen.getByRole('button', { name: 'Sign In →' });
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(submit).toHaveAccessibleName(/sign in|loading/i);
  });
});
