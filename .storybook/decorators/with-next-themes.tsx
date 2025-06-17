import * as React from "react";
import { themes as sbThemes } from "@storybook/theming";
import { DecoratorHelpers } from "@storybook/addon-themes";
import type { DecoratorFunction } from "storybook/internal/types";
import type { ReactRenderer, StoryContext } from "@storybook/react";
import { ThemeProvider, useTheme, type ThemeProviderProps } from "next-themes";
import {
  DocsContainer,
  type DocsContainerProps
} from "@storybook/addon-docs/blocks";

type ThemeSwitcherProps = React.PropsWithChildren<{
  theme: string;
}>;

const ThemeSwitcher = ({ theme, children }: ThemeSwitcherProps) => {
  const { setTheme } = useTheme();
  React.useEffect(() => setTheme(theme), [theme, setTheme]);

  return (
    <div className="rounded-lg bg-background p-4 text-foreground">
      {children}
    </div>
  );
};

type NextThemesDecorator = Omit<
  ThemeProviderProps,
  "defaultTheme" | "themes"
> & {
  defaultTheme: string;
  themes: Record<string, string>;
};

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

export const withNextThemes = ({
  themes,
  defaultTheme,
  ...props
}: NextThemesDecorator): DecoratorFunction<ReactRenderer> => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  // eslint-disable-next-line react/display-name
  return (Story, context) => {
    const selectedTheme = pluckThemeFromContext(context);
    const { themeOverride } = context.parameters.themes ?? {};
    const selected = themeOverride ?? selectedTheme ?? defaultTheme;

    return (
      <ThemeProvider defaultTheme={defaultTheme} {...props}>
        <ThemeSwitcher theme={selected}>
          <div className="bg-background text-foreground">
            <Story />
          </div>
        </ThemeSwitcher>
      </ThemeProvider>
    );
  };
};

export function CustomDocsContainer({
  context,
  children,
  ...restProps
}: React.PropsWithChildren<DocsContainerProps>) {
  const primaryStoryContext = React.useMemo(() => {
    const storyContext = context.getStoryContext(context.componentStories()[0]);
    return storyContext;
  }, [context]);

  const { themeOverride } = primaryStoryContext.parameters.themes ?? {};
  const selectedTheme = pluckThemeFromContext(
    primaryStoryContext as StoryContext
  );

  const selected = themeOverride || selectedTheme || "dark";

  const resolvedTheme = React.useMemo(() => {
    if (selected === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = isDark ? "dark" : "light";
      return systemTheme;
    }
    return selected;
  }, [selected]);

  return (
    <DocsContainer
      {...restProps}
      context={context}
      theme={sbThemes[resolvedTheme as "light" | "dark"]}>
      {children}
    </DocsContainer>
  );
}
