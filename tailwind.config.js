/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      borderRadius: { xl: "15px" },
    },
    typography: {
      DEFAULT: {
        css: {
          h1: {
            fontSize: "2.25rem",
            fontWeight: "bold",
          },
          h2: {
            fontSize: "1.875rem",
            fontWeight: "bold",
          },
          h3: {
            fontSize: "1.5rem",
            fontWeight: "bold",
          },
          p: {
            fontSize: "1rem",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
