/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#242424",
        navbar: "#211D1D",
        hsr_gold: "#d78d35",
        hsr_gray: "#1e1f21",
        white_normal: "#dedddd",
        cloudy_white_normal: "#aeacaa",
        brownish_normal: "#dbc291",
        goldish_bold: "#d78d35",
        like_button_bg: '#4D4D4D',
        scrollbarTrack: '#f0f0f0',
        scrollbarThumb: '#a0a0a0',
      },
      height: {
        '90%': '95%'
      },
      fontSize: {
        'replySize': '0.80rem'
      }
    },
  },
  plugins: [],
};
