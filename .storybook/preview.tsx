import type { Preview } from "@storybook/react";
import cx from "classix";
import { NextIntlClientProvider } from "next-intl";
import { client } from "../messages/en.json";
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
      <NextIntlClientProvider locale="en" messages={{ client }}>
        <div className={cx(variable, "font-sans")}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
