import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoginUserMutation } from '../api/authenticateApi';
import { getErrorMessage } from '@shared/api';

const loginSchema = z.strictObject({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  password: z.string().min(1, { error: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const submit = async (values: LoginFormValues) => {
    try {
      await loginUser(values).unwrap();
    } catch (mutationError) {
      const message = getErrorMessage(mutationError as Parameters<typeof getErrorMessage>[0]);
      if (message.toLowerCase().includes('username')) {
        setError('username', { type: 'server', message });
      } else if (message.toLowerCase().includes('password')) {
        setError('password', { type: 'server', message });
      }
    }
  };

  const formError = error ? 'Unable to sign in. Please try again.' : undefined;

  return (
    <form
      aria-labelledby="login-heading"
      className="flex w-full max-w-[460px] flex-col gap-6 rounded-[20px] border border-border bg-surface p-10 shadow-sm"
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase text-primary">Welcome back</p>
        <h1 id="login-heading" className="text-4xl font-bold text-fg">
          Sign in
        </h1>
        <p className="text-sm text-muted">
          Use demo credentials to explore the experience. Real authentication is not enabled.
        </p>
      </div>

      {formError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-md border border-border p-3 text-sm text-danger"
        >
          <span>{formError}</span>
          <button
            className="rounded px-2 py-1 font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            type="button"
            onClick={() => void handleSubmit(submit)()}
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-fg" htmlFor="login-username">
            Username
          </label>
          <input
            {...register('username')}
            aria-describedby={errors.username ? 'login-username-error' : undefined}
            aria-invalid={errors.username ? 'true' : 'false'}
            autoComplete="username"
            className="h-[50px] rounded-[9px] border border-border bg-surface px-3 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            id="login-username"
          />
          {errors.username && (
            <p id="login-username-error" className="text-sm text-danger">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-fg" htmlFor="login-password">
            Password
          </label>
          <input
            {...register('password')}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            aria-invalid={errors.password ? 'true' : 'false'}
            autoComplete="current-password"
            className="h-[50px] rounded-[9px] border border-border bg-surface px-3 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            id="login-password"
            type="password"
          />
          {errors.password && (
            <p id="login-password-error" className="text-sm text-danger">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted">
        Demo credentials: admin / admin123. This is not a secure production login.
      </p>
      <button
        aria-busy={isLoading}
        aria-label={isLoading ? 'Sign In →, loading' : 'Sign In →'}
        className="h-[46px] rounded-[9px] bg-primary px-4 text-[15px] font-bold text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
        type="submit"
      >
        Sign In →
      </button>
    </form>
  );
}
