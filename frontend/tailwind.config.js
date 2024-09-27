/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",     
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: "#242424",
      }
    },
  },
  plugins: [],
}

