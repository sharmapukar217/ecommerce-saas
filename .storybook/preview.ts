import "@/assets/global.css";
import type { Preview } from "@storybook/nextjs-vite";
import { CustomDocsContainer, withNextThemes } from "./decorators/with-next-themes";

const preview: Preview = {
  parameters: {
    docs: {
      container: CustomDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: withNextThemes({
    themes: {
      light: "light",
      dark: "dark",
      system: "system"
    },
    attribute: "class",
    enableSystem: true,
    defaultTheme: "system",
    disableTransitionOnChange: true
  })
};

export default preview;
