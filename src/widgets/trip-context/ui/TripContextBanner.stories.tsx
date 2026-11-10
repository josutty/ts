import type { Meta, StoryObj } from '@storybook/react';

import { TripContextBanner } from './TripContextBanner';

const meta = {
  component: TripContextBanner,
  args: {
    driverName: 'Aarav Mehta',
    company: 'Eicher Transport',
    vehicle: 'Pro 6055',
    route: 'Delhi → Jaipur',
  },
} satisfies Meta<typeof TripContextBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TripFacts: Story = {};

export const WithScoreAction: Story = {
  args: {
    action: <button type="button">Get Driver Score →</button>,
  },
};
