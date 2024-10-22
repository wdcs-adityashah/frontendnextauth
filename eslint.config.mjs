import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        Node: true,
        JSX: true,
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
        HTMLFormElement: "readonly",
        HTMLInputElement: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // If using React 17 or higher
      "no-console": "off", 
      // Add any other specific rules you want to customize
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        Node: true,
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
  },
];
