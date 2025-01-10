const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    function ({ addBase, addUtilities }) {
      addBase({
        '*': {
          padding: 0,
          margin: 0,
          'box-sizing': 'border-box',
        },
        'html, body': {
          width: '100%',
        },
      });
    }
  ],
}