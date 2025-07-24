/** @type {import("prettier").Config} */
export default {
  semi: false,
  printWidth: 120,
  singleQuote: false,
  tabWidth: 2,
  bracketSameLine: true,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@workspace/(.*)$",
    "^types$",
    "^@/types/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
}
