/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@/components/ui/**/*.{ts,tsx}", // Shadcn UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}