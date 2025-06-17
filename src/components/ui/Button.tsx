"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { useFormContext } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";

import { LoadingIcon } from "./Icons";

type ButtonBaseProps = Omit<React.ComponentProps<"button">, "disabled"> & {
  /** pass all props to child's root element */
  asChild?: boolean;

  isDisabled?: boolean;

  /** show a loading spinner along with loading content (if provided). */
  isLoading?: boolean;

  /** replace the actual content with loading ui when `isLoading` */
  loadingContent?: React.ReactNode;

  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

export const buttonVariants = tv({
  base: [
    `flex items-center justify-center gap-2 text-sm font-medium relative
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0
    [&_svg]:shrink-0 outline-none disabled:pointer-events-none disabled:opacity-75
    backdrop-blur-md backdrop-saturate-150 focus-visible:ring-2
    focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  ],
  variants: {
    variant: {
      primary: `bg-primary text-primary-foreground/85 hover:text-primary-foreground shadow-xs
      hover:bg-primary/90 focus-visible:text-primary-foreground
      focus-visible:ring-primary`,

      "primary:ghost": `text-primary hover:text-primary-foreground hover:text-primary/85
      hover:bg-primary/10 focus-visible:bg-primary/10`,

      success: `bg-success text-success-foreground/85 hover:text-success-foreground shadow-xs
      hover:bg-success/90 focus-visible:text-success-foreground
      focus-visible:ring-success`,
      "success:ghost": `text-success hover:text-success-foreground hover:text-success/85
      hover:bg-success/10 focus-visible:bg-success/10`,

      error: `bg-error text-error-foreground/85 hover:text-error-foreground shadow-xs
      hover:bg-error/90 focus-visible:text-error-foreground focus-visible:ring-error`,
      "error:ghost": `text-error hover:text-error-foreground hover:text-error/85 hover:bg-error/10
      focus-visible:bg-error/10`,

      accent: `bg-accent text-accent-foreground/75 hover:text-accent-foreground
      hover:bg-accent/85 focus-visible:text-accent-foreground
      focus-visible:ring-accent ring-1 ring-border`,

      "accent:flat": `bg-accent text-accent-foreground/75 hover:text-accent-foreground
      hover:bg-accent/85`
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3 rounded-md",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-5 rounded-lg",
      icon: "size-9 [&_svg:not([class*='size-'])]:size-5 rounded-md"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "sm"
  }
});

export type ButtonProps = ButtonBaseProps & VariantProps<typeof buttonVariants>;

export const Button = (props: ButtonProps) => {
  const {
    size,
    variant,

    asChild,
    className,
    isDisabled,

    isLoading,
    loadingContent,

    startContent,
    endContent,
    children,
    ...restProps
  } = props;

  const Comp = asChild ? Slot.Root : "button";

  const _startContent = React.useMemo(() => {
    return isLoading ? <LoadingIcon className="animate-spin" /> : startContent;
  }, [startContent, isLoading]);

  return (
    <Comp
      {...restProps}
      disabled={isDisabled ?? isLoading}
      className={buttonVariants({ className, size, variant })}>
      {_startContent}
      {size !== "icon" ? (
        <Slot.Slottable>
          {isLoading && loadingContent ? loadingContent : children}
        </Slot.Slottable>
      ) : null}
      {endContent}
    </Comp>
  );
};
