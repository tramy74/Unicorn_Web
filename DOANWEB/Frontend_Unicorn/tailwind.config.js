/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "600px",

      md: "900px",

      lg: "1200px",

      xl: "1536px",
    },
    extend: {},
    fontSize: {
      sm: "1rem",
      base: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),

    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl"), fontWeight: "bold" },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
