import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as Sheet from "@/components/ui/Sheet";

function SheetPreview() {
  return <Sheet.SheetRoot></Sheet.SheetRoot>;
}

const meta = {
  title: "UI/Sheet",
  component: SheetPreview,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() }
} satisfies Meta<typeof SheetPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary"
  }
};
