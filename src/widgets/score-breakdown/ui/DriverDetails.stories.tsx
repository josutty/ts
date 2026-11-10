import type { Meta, StoryObj } from '@storybook/react';
import { DriverDetails } from './DriverDetails';

const meta = { component: DriverDetails } satisfies Meta<typeof DriverDetails>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Demo Driver', vehicle: 'Eicher Pro', date: 'Today', duration: '2h 15m', distance: '84 km' },
};
