import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  {
    extends: [
      "tsline:all",
      "tslint:recommended",
      "tslint-react",
      "tslint-eslint-rules",
      "tslint-config-prettier",
      "prettier", //Mustbelast
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
