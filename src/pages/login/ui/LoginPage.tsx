import { Notice } from '@shared/ui';
import { useState } from 'react';
import type { FormEvent } from 'react';

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginPageProps = {
  onSubmit?: (credentials: LoginCredentials) => void | Promise<void>;
  isSubmitting?: boolean;
  error?: string;
};

type LoginFormProps = Pick<LoginPageProps, 'onSubmit' | 'isSubmitting' | 'error'>;

function LoginForm({ onSubmit, isSubmitting = false, error }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit?.({ username, password });
  }

  return (
    <form className="mt-7 space-y-5" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      {error ? (
        <p role="alert" className="rounded-control bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <div>
        <label className="mb-2 block text-sm font-bold text-fg-strong" htmlFor="username">
          Username
        </label>
        <input
          className="h-[50px] w-full rounded-control border border-border bg-surface px-4 text-fg focus:border-primary"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-fg-strong" htmlFor="password">
          Password
        </label>
        <input
          className="h-[50px] w-full rounded-control border border-border bg-surface px-4 text-fg focus:border-primary"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <p className="text-center text-xs text-fg-muted">
        Demo credentials: admin / admin123. This is not a secure production login.
      </p>
      <button
        className="h-[46px] w-full rounded-control bg-[#e62f32] text-[15px] font-bold text-white"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in…' : 'Sign In →'}
      </button>
    </form>
  );
}

function VehicleVisual() {
  return <div aria-hidden="true" className="absolute bottom-0 right-0 h-32 w-48 rounded-tl-full bg-primary/10" />;
}

export function LoginPage({ onSubmit, isSubmitting = false, error }: LoginPageProps) {
  return (
    <>
      <main id="login-content" className="min-h-screen bg-surface-muted px-5 py-8 text-fg md:px-10 md:py-10">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1280px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16">
          <section className="login-hero relative flex min-h-[520px] flex-col justify-center overflow-hidden rounded-[20px] px-6 py-10 sm:px-12 lg:px-16">
            <div className="relative z-10 max-w-[560px]">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-danger">
                Eicher Digital Operations
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-fg-strong sm:text-[44px]">
                Smarter journeys. Clearer insights.
              </h1>
              <p className="mt-6 max-w-[510px] text-sm leading-6 text-fg-muted">
                An intuitive way to explore Eicher vehicles, monitor a trip and understand driver performance.
              </p>
              <Notice className="mt-10 border-[#f3d8a5] bg-[#fff8e8] text-[#815b13]">
                <p>Prototype access only. No real account verification or live vehicle data is connected.</p>
              </Notice>
            </div>
            <VehicleVisual />
          </section>

          <section
            aria-labelledby="login-panel-title"
            className="login-panel w-full max-w-[460px] min-h-[540px] justify-self-end rounded-[20px] border border-border bg-white p-7 shadow-xl sm:p-[42px] lg:w-[460px]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-danger">Welcome back</p>
            <h2 id="login-panel-title" className="mt-3 text-[38px] font-bold leading-tight text-fg-strong">
              Sign in
            </h2>
            <p className="mt-3 text-sm leading-6 text-fg-muted">
              Use demo credentials to explore the experience. Real authentication is not enabled.
            </p>
            <LoginForm onSubmit={onSubmit} isSubmitting={isSubmitting} error={error} />
          </section>
        </div>
      </main>
    </>
  );
}
