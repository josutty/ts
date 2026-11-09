import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a loading button as busy and disabled with its loading label', () => {
    render(
      <Button loading loadingLabel="Saving driver">
        Save driver
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Saving driver' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
