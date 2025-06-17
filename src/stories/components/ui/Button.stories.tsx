import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary"
  }
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent"
  }
};
