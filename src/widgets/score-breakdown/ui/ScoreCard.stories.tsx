import type { Meta, StoryObj } from '@storybook/react';
import { ScoreCard } from './ScoreCard';

const meta = { component: ScoreCard } satisfies Meta<typeof ScoreCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { score: 92 } };
