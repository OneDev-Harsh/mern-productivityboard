/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 tells Tailwind to scan all your source files
  ],
  theme: {
    extend: {}, // you can customize colors, fonts, etc. here
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["halloween", "forest"],
  },
}
