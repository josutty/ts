import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';
const meta = {
  component: Notice,
  title: 'Shared UI/Notice',
  args: { children: 'Telemetry is simulated.' },
} satisfies Meta<typeof Notice>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Info: Story = {};
export const Danger: Story = { args: { tone: 'danger', title: 'Unable to connect.' } };
