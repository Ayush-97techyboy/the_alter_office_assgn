/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutralblack-40": "var(--neutralblack-40)",
      },
      fontFamily: {
        "t10-12-semi-bold": "var(--t10-12-semi-bold-font-family)",
        "t6-14-bold": "var(--t6-14-bold-font-family)",
        "tab-2-14-regular": "var(--tab-2-14-regular-font-family)",
        "tab-2-regular": "var(--tab-2-regular-font-family)",
        "tab-3-medium": "var(--tab-3-medium-font-family)",
        "title-2-upper-case-bold": "var(--title-2-upper-case-bold-font-family)",
      },
    },
  },
  plugins: [],
};
