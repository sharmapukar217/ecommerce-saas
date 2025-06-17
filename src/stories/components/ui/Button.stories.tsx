import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LuArrowRight } from "react-icons/lu";
import { Button, type ButtonProps } from "@/components/ui/Button";

const VARIANTS = [
  "primary",
  "primary:ghost",
  "success",
  "success:ghost",
  "error",
  "error:ghost",
  "accent",
  "accent:flat"
] as const;

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: VARIANTS,
      description: "Visual style of the button"
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button"
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled"
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button shows a loading spinner"
    },
    loadingContent: {
      control: "text",
      description: "Content to show while loading (replaces children)"
    },
    startContent: {
      control: "boolean",
      description: "Toggle for demo start icon"
    },
    endContent: {
      control: "boolean",
      description: "Toggle for demo end icon"
    },
    children: {
      control: "text",
      description: "Button label"
    }
  },
  args: {
    variant: "primary",
    size: "sm",
    children: "Click me",
    isDisabled: false,
    isLoading: false,
    loadingContent: "Loading...",
    onClick: fn()
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    showEndContent: true,
    showStartContent: true,
    children: "Continue"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  render: ({
    showEndContent,
    showStartContent,
    ...restProps
  }: ButtonProps & {
    showEndContent?: boolean;
    showStartContent?: boolean;
  }) => (
    <Button
      {...restProps}
      startContent={
        showStartContent ? <LuArrowRight className="rotate-180" /> : undefined
      }
      endContent={showEndContent ? <LuArrowRight /> : undefined}
    />
  )
};

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingContent: "Loading..."
  }
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <LuArrowRight />,
    "aria-label": "Arrow icon button"
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-row flex-wrap gap-4">
      {VARIANTS.map((variant) => (
        <Button key={variant} className="capitalize" variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
};
