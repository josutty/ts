import type { Meta, StoryObj } from '@storybook/react';
import { DemoStrip } from './DemoStrip';
const meta = { component: DemoStrip, title: 'Shared UI/DemoStrip' } satisfies Meta<typeof DemoStrip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
