// @ts-expect-error no declaration
const tailwindPlugin = require("prettier-plugin-tailwindcss");
/** @type {any} */
const sortImportsPlugin = require("@trivago/prettier-plugin-sort-imports");

/** @type {import('prettier').Config} */
module.exports = {
  pluginSearchDirs: false,
  // HACK: plugins using private prettier APIs are incompatible
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31
  plugins: [
    {
      parsers: {
        typescript: {
          ...tailwindPlugin.parsers.typescript,
          preprocess: sortImportsPlugin.parsers.typescript.preprocess,
        },
      },
      options: {
        ...sortImportsPlugin.options,
      },
    },
  ],
  printWidth: 100,
  importOrder: [
    "^react$",
    "^next(/.*)?$",
    "<THIRD_PARTY_MODULES>",
    "^\\.[./]*/components/",
    "^\\.",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
