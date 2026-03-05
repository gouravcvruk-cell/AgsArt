/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        roseGold: "#B76E79",
        cream: "#FAF5EE",
        champagne: "#D4AF37",
        softBlack: "#1A1A1A"
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["DM Sans", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 20px 45px rgba(26,26,26,0.15)"
      }
    }
  },
  plugins: []
};
