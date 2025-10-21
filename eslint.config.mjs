import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["prettier", "simple-import-sort"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: false,
          semi: true,
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
      "prefer-const": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "ignore" },
      ],
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  }),
];

export default eslintConfig;
