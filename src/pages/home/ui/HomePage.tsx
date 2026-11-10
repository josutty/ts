import { LoginForm } from '@features/authenticate';

export function HomePage() {
  return (
    <main id="login-content" className="min-h-screen bg-surface-muted px-5 py-8 text-fg md:px-10 md:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1280px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16 [&_.bg-primary]:bg-danger [&_.text-muted]:text-fg-muted [&_.text-on-primary]:text-danger-fg [&_.text-primary]:text-danger">
        <section className="relative flex min-h-[520px] flex-col justify-center overflow-hidden rounded-card bg-login-hero px-6 py-10 sm:px-12 lg:px-16">
          <div className="relative z-10 max-w-[560px]">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-danger">Eicher Digital Operations</p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.08] text-fg-strong sm:text-[44px]">
              Smarter journeys. Clearer insights.
            </h2>
            <p className="mt-6 max-w-[510px] text-sm leading-6 text-fg-muted">
              An intuitive way to explore Eicher vehicles, monitor a trip and understand driver performance.
            </p>
            <div
              className="mt-10 rounded-control border border-[rgb(var(--color-warning-border))] bg-warning-soft p-3.5 text-sm text-[rgb(var(--color-warning-fg))]"
              role="status"
            >
              <p>Prototype access only. No real account verification or live vehicle data is connected.</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute bottom-0 right-0 h-32 w-48 rounded-tl-full bg-primary/10" />
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
