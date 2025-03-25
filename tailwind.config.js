/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--light)',
        secondary: 'var(--dark)'
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Add your custom font
        heading: ['Poppins', 'sans-serif'], // Example of another custom font
      },
     
    },
  },
  plugins: [],
}