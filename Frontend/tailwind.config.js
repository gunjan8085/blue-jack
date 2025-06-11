/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D7D4FF",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      });
    },
  ],
};
