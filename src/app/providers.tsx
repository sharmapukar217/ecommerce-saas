"use client";

import * as React from "react";
import { ThemeProvider, useTheme } from "next-themes";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {props.children}
      <BreakpointInfo />
    </ThemeProvider>
  );
}

function BreakpointInfo() {
  const { resolvedTheme, setTheme } = useTheme();
  const lastClickTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const updateTheme = React.useCallback(() => {
    if (lastClickTimeout.current) {
      clearTimeout(lastClickTimeout.current);
      lastClickTimeout.current = null;
      setTheme("system");
    } else {
      lastClickTimeout.current = setTimeout(() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
        lastClickTimeout.current = null;
      }, 200);
    }
  }, [setTheme, resolvedTheme]);

  return (
    <button
      onClick={updateTheme}
      onContextMenu={(ev) => ev.preventDefault()}
      className="fixed right-4 bottom-4 flex size-6.5 cursor-pointer items-center justify-center
        rounded-full bg-card text-xs font-medium text-card-foreground/85 shadow-sm
        ring-2 ring-border transition-colors select-none hover:text-card-foreground
        focus:ring-primary">
      <p className="block sm:hidden">xs</p>
      <p className="hidden sm:block md:hidden">sm</p>
      <p className="hidden md:block lg:hidden">md</p>
      <p className="hidden lg:block xl:hidden">lg</p>
      <p className="hidden xl:block 2xl:hidden">xl</p>
      <p className="hidden 2xl:block">2xl</p>
    </button>
  );
}
