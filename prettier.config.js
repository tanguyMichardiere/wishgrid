/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-jsdoc",
  ],
  tsdoc: true,
};
