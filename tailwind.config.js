/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e63946",
        secondary: "#1D3557",
        "secondary-light": "#457B9D",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxHeight: {
        "800px": "800px",
      },
      minHeight: {
        "200px": "200px",
        "500px": "500px",
      },
      display: {
        "webkit-box": "-webkit-box",
      },
      maxWidth: {
        "30ch": "30ch",
        "10ch": "10ch",
        "8/10": "80%",
      },
      minWidth: {
        "30ch": "30ch",
        "1/2": "50%",
        "8/10": "80%",
      },
      backgroundSize: {
        "200%": "200%",
      },
      fontFamily: {
        monoton: ['"monoton"'],
        roboto: ['"roboto"'],
        lexend: ["Lexend", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
