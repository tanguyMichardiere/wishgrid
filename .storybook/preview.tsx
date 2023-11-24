import type { Preview } from "@storybook/react";
import cx from "classix";
import { variable } from "../src/app/font";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={cx(variable, "font-sans")}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
