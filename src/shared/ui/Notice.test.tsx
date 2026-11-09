import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Notice } from './Notice';

describe('Notice', () => {
  it('uses alert semantics for a danger notice and status semantics otherwise', () => {
    const { rerender } = render(
      <Notice tone="danger" title="Unable to connect.">
        Try again later.
      </Notice>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to connect. Try again later.');

    rerender(<Notice tone="success">Driver saved.</Notice>);
    expect(screen.getByRole('status')).toHaveTextContent('Driver saved.');
  });
});
