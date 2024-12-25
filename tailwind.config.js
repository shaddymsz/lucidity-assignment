/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all JS/TS/React files in src
    "./public/index.html",         // For Create React App (optional)
  ],
  theme: {
    extend: {}, 
  },
  plugins: [], // Add Tailwind plugins here if needed
}

