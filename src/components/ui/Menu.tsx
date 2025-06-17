import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { CheckIcon, ChevronRightIcon, DotIcon } from "./Icons";

export const MenuRoot = DropdownMenu.Root;
export const MenuPortal = DropdownMenu.Portal;
export const MenuTrigger = DropdownMenu.Trigger;

export const MenuGroup = DropdownMenu.Group;
export const MenuSub = DropdownMenu.Sub;

const menuItemVariant = tv({
  base: [
    // for base menu item
    `[&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default
    items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium
    text-accent-foreground/85 outline-hidden backdrop-blur-sm transition-colors
    select-none focus:bg-accent focus:text-accent-foreground
    data-[disabled]:pointer-events-none data-[disabled]:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4`,

    // for sub menu item (when opened)
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
  ],
  variants: {
    inset: {
      true: "pr-2 pl-8 "
    }
  }
});

export const MenuContent = (props: DropdownMenu.DropdownMenuContentProps) => {
  const { className, align = "end", sideOffset = 4, ...restProps } = props;
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        {...restProps}
        align={align}
        sideOffset={sideOffset}
        className={twMerge(
          `z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem]
          origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden
          overflow-y-auto rounded-md border border-border/80 bg-popover p-1
          text-popover-foreground shadow-xs backdrop-blur-sm
          data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95 data-[state=open]:animate-in
          data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`,
          className
        )}
      />
    </DropdownMenu.Portal>
  );
};

export const MenuItem = (
  props: React.ComponentProps<typeof DropdownMenu.Item>
) => {
  const { className, ...restProps } = props;

  return (
    <DropdownMenu.Item
      {...restProps}
      className={menuItemVariant({ className })}
    />
  );
};

export const MenuSubTrigger = (
  props: React.ComponentProps<typeof DropdownMenu.SubTrigger>
) => {
  const { className, children, ...restProps } = props;
  return (
    <DropdownMenu.SubTrigger
      {...restProps}
      className={menuItemVariant({ className })}>
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenu.SubTrigger>
  );
};

export const MenuSubContent = (
  props: React.ComponentProps<typeof DropdownMenu.SubContent>
) => {
  const { className, sideOffset = 8, ...restProps } = props;
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent
        {...restProps}
        sideOffset={sideOffset}
        className={twMerge(
          `z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin)
          overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground
          shadow-lg data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95`,
          className
        )}
      />
    </DropdownMenu.Portal>
  );
};

export const MenuCheckboxItem = (
  props: React.ComponentProps<typeof DropdownMenu.CheckboxItem>
) => {
  const { className, children, ...restProps } = props;
  return (
    <DropdownMenu.CheckboxItem
      {...restProps}
      className={menuItemVariant({ className: [className, "pe-8"] })}>
      {children}
      <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
        <DropdownMenu.ItemIndicator>
          <CheckIcon />
        </DropdownMenu.ItemIndicator>
      </span>
    </DropdownMenu.CheckboxItem>
  );
};

export const MenuRadioGroup = DropdownMenu.RadioGroup;

export const MenuRadioItem = (
  props: React.ComponentProps<typeof DropdownMenu.RadioItem>
) => {
  const { className, children, ...restProps } = props;
  return (
    <DropdownMenu.RadioItem
      {...restProps}
      className={menuItemVariant({ className, inset: true })}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenu.ItemIndicator>
          <DotIcon className="size-2 fill-current" />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.RadioItem>
  );
};

export const MenuLabel = (
  props: React.ComponentProps<typeof DropdownMenu.Label>
) => {
  const { className, ...restProps } = props;
  return (
    <DropdownMenu.Label
      {...restProps}
      className={twMerge(
        "px-2 py-1.5 text-sm font-medium text-foreground/75",
        className
      )}
    />
  );
};

export const MenuSeparator = (
  props: React.ComponentProps<typeof DropdownMenu.Separator>
) => {
  const { className, ...restProps } = props;
  return (
    <DropdownMenu.Separator
      {...restProps}
      className={twMerge("-mx-1 my-1 h-px bg-border", className)}
    />
  );
};
