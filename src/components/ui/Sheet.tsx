"use client";
import * as React from "react";
import { Drawer } from "vaul";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

type Variant = "flat" | "floating";
type Direction = "left" | "right" | "bottom";
type Backdrop = "opaque" | "transparent" | "blur";

type SheetContext = {
  variant: Variant;
  backdrop: Backdrop;
  direction: Direction;
};

type SheetRootProps = React.ComponentProps<typeof Drawer.Root> &
  Partial<SheetContext>;

const Ctx = React.createContext<SheetContext>({
  variant: "flat",
  backdrop: "blur",
  direction: "right"
});

export const SheetRoot = (props: SheetRootProps) => {
  const {
    variant = "flat",
    direction = "right",
    backdrop = "blur",
    ...restProps
  } = props;
  return (
    <Ctx.Provider value={{ variant, backdrop, direction }}>
      <Drawer.Root direction={direction} {...restProps} />
    </Ctx.Provider>
  );
};

export const SheetTrigger = Drawer.Trigger;
export const SheetClose = Drawer.Close;

export const SheetPortal = Drawer.Portal;

type SheetOverlayProps = {
  className?: string;
  backdrop?: Backdrop;
};

export const SheetOverlay = (props: SheetOverlayProps) => {
  const ctx = React.use(Ctx);
  const { className, backdrop = ctx.backdrop, ...restProps } = props;

  return (
    <Drawer.Overlay
      className={twMerge(
        `fixed inset-0 z-50 bg-background/50 data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:animate-in
        data-[state=open]:fade-in-0`,

        backdrop === "transparent" && "bg-transparent",
        backdrop === "blur" && "backdrop-blur-md backdrop-saturate-150",

        className
      )}
      {...restProps}
    />
  );
};

export const SheetHandler = (
  props: React.ComponentProps<typeof Drawer.Handle>
) => {
  const { direction } = React.useContext(Ctx);
  const { className, ...restProps } = props;
  return (
    <Drawer.Handle
      {...restProps}
      onContextMenu={(e) => e.preventDefault()}
      className={twMerge(
        "!bg-muted/70 hover:bg-muted m-auto shrink-0",
        direction === "bottom" && "mt-2 !h-2 !w-[100px]",
        direction === "right" && "!ms-2 !h-[100px] !w-2",
        direction === "left" && "order-2 !mr-2 !h-[100px] !w-2",
        className
      )}
    />
  );
};

type SheetContentProps = React.ComponentProps<typeof Drawer.Content> & {
  showHandle?: boolean;
  containerClassName?: string;
  variant?: "flat" | "floating";
  backdrop?: SheetOverlayProps["backdrop"];
};

export const SheetContent = (props: SheetContentProps) => {
  const { direction, variant } = React.use(Ctx);
  const { className, children, showHandle, containerClassName, ...restProps } =
    props;

  return (
    <SheetPortal>
      <SheetOverlay />
      <Drawer.Content
        onContextMenu={(e) => e.preventDefault()}
        className={twMerge(
          `fixed z-50 flex h-auto w-[90%] flex-row bg-popover shadow-sm backdrop-blur-md
          after:hidden after:bg-popover after:backdrop-blur-md`,

          variant === "flat" && [
            direction === "left" &&
              "inset-y-0 left-0 rounded-r-lg border-y border-r sm:max-w-sm",
            direction === "right" &&
              "inset-y-0 right-0 rounded-l-lg border-y border-l sm:max-w-sm",
            direction === "bottom" &&
              "inset-x-0 bottom-0 h-fit w-full flex-col rounded-t-lg border-t"
          ],

          variant === "floating" && [
            direction === "left" &&
              "inset-y-4 left-0 rounded-lg border data-[state=open]:left-4 sm:max-w-sm",
            direction === "right" &&
              "inset-y-4 right-0 rounded-lg border data-[state=open]:right-4 sm:max-w-sm",
            direction === "bottom" &&
              `inset-x-4 bottom-0 h-fit w-auto flex-col rounded-lg border
              data-[state=open]:bottom-4`
          ],

          className
        )}
        {...restProps}>
        {showHandle ? <SheetHandler /> : null}
        <div className={twMerge("flex-1 p-4", containerClassName)}>
          {children}
        </div>
      </Drawer.Content>
    </SheetPortal>
  );
};

export const SheetHeader = (props: React.ComponentProps<"div">) => {
  const { className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge("flex flex-col gap-1.5 p-4", className)}
    />
  );
};

export const SheetFooter = (props: React.ComponentProps<"div">) => {
  const { className, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge("mt-auto flex flex-col gap-2 p-4", className)}
    />
  );
};

export const SheetTitle = (
  props: React.ComponentProps<typeof Drawer.Title>
) => {
  const { className, ...restProps } = props;
  return (
    <Drawer.Title
      {...restProps}
      className={twMerge("font-semibold text-foreground", className)}
    />
  );
};

export const SheetDescription = (
  props: React.ComponentProps<typeof Drawer.Description>
) => {
  const { className, ...restProps } = props;
  return (
    <Drawer.Description
      {...restProps}
      className={twMerge("text-muted-foreground text-sm", className)}
    />
  );
};
