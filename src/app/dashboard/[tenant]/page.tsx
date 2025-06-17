"use client";

import { buttonVariants } from "@/components/ui/Button";
import * as Sheet from "@/components/ui/Sheet";

const variants = ["flat", "floating"] as const;
const directions = ["left", "right", "bottom"] as const;

export default function DashboardTenantPage() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {directions.map((dir) =>
        variants.map((variant) => (
          <Sheet.SheetRoot
            handleOnly
            key={`${dir}:${variant}`}
            variant={variant}
            direction={dir}>
            <Sheet.SheetTrigger
              className={buttonVariants({
                variant: "accent",
                className: "capitalize"
              })}>
              {dir}:{variant}
            </Sheet.SheetTrigger>
            <Sheet.SheetContent showHandle>
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
  );
}
