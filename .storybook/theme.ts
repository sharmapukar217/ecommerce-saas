import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// TODO: Add all colors here later on 
// once storybook supports css variables support
export default create({
  base:"light",
  appBg: 'var(--color-background)',
  textColor: 'var(--color-foreground)',
  appBorderColor: 'var(--color-border)',

  appPreviewBg: "var(--color-card)",
  colorPrimary: 'var(--color-primary)',
})