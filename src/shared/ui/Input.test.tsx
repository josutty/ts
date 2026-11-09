import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('associates its label and accessible error description with the field', () => {
    render(<Input label="Driver name" hint="Use the full name." error="Enter a driver name." />);

    const input = screen.getByRole('textbox', { name: 'Driver name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use the full name. Enter a driver name.');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a driver name.');
  });
});
