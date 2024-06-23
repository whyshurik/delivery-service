/** @type {import('tailwindcss').Config} */
export default {
  content: [
      ".index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      fontSize: {
          '16px': '16px', // Add a custom font size
      },
      colors: {
          'green': '#23B680',
          'lighter': '#DAEFDC',
      },
    extend: {
          fontFamily: {
              nanum: ['Nanum Muganjo', 'nanum-muganjo']
          }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],

}

