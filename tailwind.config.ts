import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: token('surface'), muted: token('surface-muted') },
        fg: { DEFAULT: token('fg'), muted: token('fg-muted') },
        border: { DEFAULT: token('border'), strong: token('border-strong') },
        primary: { DEFAULT: token('primary'), fg: token('primary-fg'), soft: token('primary-soft') },
        danger: { DEFAULT: token('danger'), fg: token('danger-fg') },
        success: { DEFAULT: token('success'), fg: token('success-fg') },
        warning: { DEFAULT: token('warning'), fg: token('warning-fg'), soft: token('warning-soft') },
        accent: token('accent'),
        inverse: { DEFAULT: token('inverse'), muted: token('inverse-muted') },
        focus: token('focus'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'heading-1': ['2.75rem', { lineHeight: '3rem', fontWeight: '700' }],
        'heading-2': ['2.375rem', { lineHeight: '2.75rem', fontWeight: '700' }],
        'heading-3': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        body: ['0.9375rem', { lineHeight: '1.5rem' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        caption: ['0.75rem', { lineHeight: '1rem' }],
        label: ['0.8125rem', { lineHeight: '1rem', fontWeight: '700' }],
        overline: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.06em', fontWeight: '700' }],
        micro: ['0.6875rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: { control: 'var(--radius-control)', card: 'var(--radius-card)' },
      backgroundImage: { 'login-hero': 'var(--gradient-login-hero)', page: 'var(--gradient-page)' },
      boxShadow: { card: 'var(--shadow-card)' },
    },
  },
  plugins: [],
} satisfies Config;
