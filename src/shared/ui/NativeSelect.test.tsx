import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NativeSelect } from './NativeSelect';

describe('NativeSelect', () => {
  it('associates its label, options, and accessible error description', () => {
    render(
      <NativeSelect
        label="Vehicle"
        options={[
          { label: 'Choose a vehicle', value: '' },
          { label: 'Truck 01', value: 'truck-01' },
          { label: 'Truck 02', value: 'truck-02', disabled: true },
        ]}
        hint="Select the assigned vehicle."
        error="Select a vehicle."
      />,
    );

    const select = screen.getByRole('combobox', { name: 'Vehicle' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Select the assigned vehicle. Select a vehicle.');
    expect(screen.getByRole('option', { name: 'Truck 02' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('Select a vehicle.');
  });
});
