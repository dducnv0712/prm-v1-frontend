module.exports = {
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: 'class',
  theme: {
      extend: {
        colors: {
          'primary-red':"#c42726",
          'yellow':"#fbf4ed"
      }
      },
      
  },
  variants: {
      extend: {},
      display: ["group-hover"]
  },
  plugins: [],
}