import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as Sheet from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

const SHEET_VARIANTS: Sheet.SheetVariant[] = ["flat", "floating"];
const SHEET_DIRECTIONS: Sheet.SheetDirection[] = ["right", "left", "bottom"];
const SHEET_BACKDROPS: Sheet.SheetBackdrop[] = [
  "opaque",
  "transparent",
  "blur"
];

/**
 * Props for the SheetPreview component.
 */
type SheetPreviewProps = {
  /**
   * Visual variant of the Sheet (e.g., flat, floating).
   */
  variant?: Sheet.SheetVariant;

  /**
   * Direction from which the Sheet enters (e.g., right, bottom, left).
   */
  direction?: Sheet.SheetDirection;

  /**
   * Type of backdrop used behind the Sheet (e.g., blur, transparent, none).
   */
  backdrop?: Sheet.SheetBackdrop;

  /**
   * Whether to show the handle bar on the Sheet.
   */
  showHandle?: boolean;

  /**
   * Content to be displayed inside the Sheet.
   */
  children?: React.ReactNode;
};

/**
 * A preview component for rendering the Sheet with various configurations.
 */
function SheetPreview({
  variant,
  direction,
  backdrop,
  showHandle,
  children
}: SheetPreviewProps) {
  return (
    <Sheet.SheetRoot
      variant={variant}
      direction={direction}
      backdrop={backdrop}>
      <Sheet.SheetTrigger asChild>
        <Button variant="accent">Toggle Sheet</Button>
      </Sheet.SheetTrigger>
      <Sheet.SheetContent showHandle={showHandle}>
        <div className="mb-4">
          <Sheet.SheetTitle>Sheet</Sheet.SheetTitle>
          <Sheet.SheetDescription>
            {variant}-{direction} {backdrop}-backdrop sheet{" "}
            {showHandle ? "with handle" : "without handle"}.
          </Sheet.SheetDescription>
        </div>
        {children}
      </Sheet.SheetContent>
    </Sheet.SheetRoot>
  );
}

const meta = {
  title: "UI/Sheet",
  component: SheetPreview,
  subcomponents: Sheet,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: SHEET_VARIANTS,
      table: {
        defaultValue: {
          summary: "flat"
        }
      },
      description: "The visual style of the sheet."
    },
    direction: {
      control: { type: "select" },
      options: SHEET_DIRECTIONS,
      table: { defaultValue: { summary: "right" } },
      description: "The direction from which the sheet enters."
    },
    backdrop: {
      control: { type: "select" },
      options: SHEET_BACKDROPS,
      table: { defaultValue: { summary: "blur" } },
      description: "The backdrop effect used behind the sheet."
    },
    showHandle: {
      control: { type: "boolean" },
      table: { defaultValue: { summary: "false" } },
      description: "Whether to display a drag handle indicator on the sheet."
    },
    children: {
      control: { type: "text" },
      description: "Content rendered inside the Sheet."
    }
  },
  args: {
    variant: "flat",
    direction: "right",
    backdrop: "blur",
    showHandle: true,
    children: "This is the content of the sheet."
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `Sheet` component is a side drawer that can slide in from any direction. Useful for menus, settings, and additional content without leaving the current context."
      }
    }
  }
} satisfies Meta<typeof SheetPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Sheet with standard settings.
 */
export const Default: Story = {};

/**
 * Sheet with blur backdrop and sliding in from the bottom.
 */
export const LeftBlur: Story = {
  args: {
    direction: "left",
    backdrop: "blur",
    showHandle: true,
    children: "Left slide with blur backdrop"
  }
};

/**
 * Transparent sheet from the left side without handle.
 */
export const BottomFloat: Story = {
  args: {
    showHandle: false,
    variant: "floating",
    direction: "bottom",
    backdrop: "transparent",
    children: "Left transparent floating sheet without handle"
  }
};

/** All Variants **/
export const Variants: Story = {
  render: () => {
    const [showHandle, setShowHandle] = React.useState(true);
    const [backdrop, setBackdrop] = React.useState(SHEET_BACKDROPS[0]);

    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-4">
          {SHEET_DIRECTIONS.map((dir) =>
            SHEET_VARIANTS.map((variant) => (
              <Sheet.SheetRoot
                key={`${dir}:${variant}`}
                variant={variant}
                direction={dir}
                backdrop={backdrop}>
                <Sheet.SheetTrigger asChild>
                  <Button variant="accent" className="uppercase">
                    {dir} {variant}
                  </Button>
                </Sheet.SheetTrigger>
                <Sheet.SheetContent showHandle={showHandle}>
                  <div className="contents">
                    <Sheet.SheetTitle>Title</Sheet.SheetTitle>
                    <Sheet.SheetDescription>Description</Sheet.SheetDescription>
                  </div>
                  <div>abc</div>
                </Sheet.SheetContent>
              </Sheet.SheetRoot>
            ))
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="grid gap-2">
            <label>
              Show Handle
              <input
                type="checkbox"
                className="ms-2 accent-primary"
                checked={showHandle}
                onChange={() => setShowHandle((v) => !v)}
              />
            </label>

            <div className="flex flex-wrap gap-8">
              <h1>Backdrop: ({backdrop})</h1>
              {SHEET_BACKDROPS.map((b) => (
                <div key={b} className="flex gap-2">
                  <input
                    type="radio"
                    className=""
                    name="backdrop"
                    id={`backdrop-${b}`}
                    checked={backdrop === b}
                    value={b}
                    onChange={() => {
                      setBackdrop(b);
                    }}
                  />
                  <label htmlFor={`backdrop-${b}`}>{b}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
