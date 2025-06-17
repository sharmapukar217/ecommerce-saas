import * as React from "react";
import { useTheme } from "next-themes";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as Menu from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";

const meta: Meta = {
  title: "UI/Menu",
  component: Menu.MenuRoot,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj;

/**
 * Basic usage of the custom Menu component
 */
export const Default: Story = {
  render: () => {
    const { theme, setTheme } = useTheme();
    const [selected, setSelected] = React.useState(["f1"]);

    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm">
          Selected Option:&nbsp;
          <span className="font-medium text-primary">
            {selected.join(", ")}
          </span>
        </p>

        <Menu.MenuRoot>
          <Menu.MenuTrigger asChild>
            <Button variant="accent">Open Menu</Button>
          </Menu.MenuTrigger>
          <Menu.MenuContent>
            <Menu.MenuLabel>Quick Actions</Menu.MenuLabel>

            <Menu.MenuItem>Profile</Menu.MenuItem>
            <Menu.MenuItem>Settings</Menu.MenuItem>

            <Menu.MenuSeparator />

            <Menu.MenuSub>
              <Menu.MenuSubTrigger>Enable Feature</Menu.MenuSubTrigger>
              <Menu.MenuSubContent>
                <Menu.MenuLabel>Features</Menu.MenuLabel>
                {["f1", "f2", "f3"].map((feat) => (
                  <Menu.MenuCheckboxItem
                    key={feat}
                    checked={selected.includes(feat)}
                    onSelect={(ev) => {
                      ev.preventDefault();
                      if (selected.includes(feat))
                        setSelected((v) => v.filter((v) => v !== feat));
                      else setSelected((v) => [...v, feat]);
                    }}>
                    Feature 1
                  </Menu.MenuCheckboxItem>
                ))}
              </Menu.MenuSubContent>
            </Menu.MenuSub>

            <Menu.MenuSeparator />

            <Menu.MenuSub>
              <Menu.MenuSubTrigger>Theme</Menu.MenuSubTrigger>
              <Menu.MenuSubContent>
                <Menu.MenuRadioGroup value={theme} onValueChange={setTheme}>
                  <Menu.MenuLabel>Theme</Menu.MenuLabel>
                  <Menu.MenuRadioItem value="light">Light</Menu.MenuRadioItem>
                  <Menu.MenuRadioItem value="dark">Dark</Menu.MenuRadioItem>
                  <Menu.MenuRadioItem value="system">System</Menu.MenuRadioItem>
                </Menu.MenuRadioGroup>
              </Menu.MenuSubContent>
            </Menu.MenuSub>
          </Menu.MenuContent>
        </Menu.MenuRoot>
      </div>
    );
  }
};
