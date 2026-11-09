import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect } from './NativeSelect';
const meta = {
  component: NativeSelect,
  title: 'Shared UI/NativeSelect',
  args: {
    label: 'Vehicle',
    options: [
      { label: 'Truck 01', value: 'truck-01' },
      { label: 'Truck 02', value: 'truck-02' },
    ],
  },
} satisfies Meta<typeof NativeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: 'Select a vehicle.' } };
