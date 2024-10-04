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
        navbar: "#211D1D",
        hsr_gold: "#d78d35",
        hsr_gray: "#1e1f21"
      }
    },
  },
  plugins: [],
}

