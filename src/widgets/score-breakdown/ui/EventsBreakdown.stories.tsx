import type { Meta, StoryObj } from '@storybook/react';
import { EventsBreakdown } from './EventsBreakdown';

const meta = { component: EventsBreakdown } satisfies Meta<typeof EventsBreakdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: [
      { label: 'Seatbelt Violation', count: 0 },
      { label: 'Harsh Acceleration', count: 2 },
      { label: 'Harsh Braking', count: 1 },
      { label: 'Fast Cornering', count: 0 },
      { label: 'Handbraking', count: 0 },
      { label: 'Overspeeding', count: 4 },
    ],
  },
};
