/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-tailwindcss",
  ],
  tsdoc: true,
  tailwindFunctions: ["cx"],
};
