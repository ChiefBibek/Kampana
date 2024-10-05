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
        "planetbg":"url('/Images/Helo.jpg')"
      },
      borderRadius: {
        'required': '1.875rem', // Add custom rounded value
      },

    },
  },
  plugins: [],
}