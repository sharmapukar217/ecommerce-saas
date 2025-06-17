import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as Icons from "@/components/ui/Icons";

const meta: Meta = {
  title: "Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "List of all icons used in the application."
      }
    }
  }
};

export default meta;
type Story = StoryObj;

const iconEntries = Object.entries(Icons) as [
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
][];

export const Docs: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {iconEntries.map(([name, IconComponent]) => (
        <div
          key={name}
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border
            bg-card p-4 text-sm font-medium text-foreground/85 shadow-xs
            hover:text-foreground">
          <IconComponent className="size-6 shrink-0" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
};
