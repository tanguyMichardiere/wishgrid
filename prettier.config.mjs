/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-tailwindcss",
  ],
  tsdoc: true,
  tailwindFunctions: ["cx"],
};

export default config;
