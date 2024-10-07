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
        "planetbg":"url('/Images/Helo.jpg')",
        "brief":"url('/Images/Overview.jpg')",
        "slide2":"url('/Images/Slide2.jpg')",
        "slide3":"url('/Images/slide3.jpg')",
        "slide1":"url('/Images/SpaceBg.jpg')",
        "slide4":"url('/Images/Slide4.jpg')",
        "slide5":"url('/Images/Slide5.jpg')",
        "slide6":"url('/Images/Slide6.jpg')",
        "slide7":"url('/Images/Slide7.jpg')",
      },
      borderRadius: {
        'required': '1.875rem', // Add custom rounded value
      },

    },
  },
  plugins: [],
}