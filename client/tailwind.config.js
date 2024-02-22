/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        logofont: ["Sevillana", "cursive"]
      },
      backgroundImage: {
        'heroimg': "url('/src/images/heroimg.png')",
        'Signup':"url('/src/images/signup.jpg')"
      },
    },
  },
}