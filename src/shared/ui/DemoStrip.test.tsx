import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoStrip } from './DemoStrip';

describe('DemoStrip', () => {
  it('shows the prototype status text in the specified order', () => {
    render(<DemoStrip />);

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(
      'PROTOTYPESimulated vehicle telemetry and driver scoresNot connected to live VECV systems',
    );
    expect(status.textContent).toBe(
      'PROTOTYPESimulated vehicle telemetry and driver scoresNot connected to live VECV systems',
    );
  });
});
