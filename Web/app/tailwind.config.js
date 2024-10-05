/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/Images/HomeBg.png')",
      },
      borderRadius: {
        'required': '1.875rem', // Add custom rounded value
      },

    },
  },
  plugins: [],
}