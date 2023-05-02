module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
 
  theme: {
    extend: {
      height: {
        'book-cover': '20rem',
      },
      width: {
        'book-cover': '12rem',
      },
      
      colors: {
        primary: '#4B5563',
        secondary: '#9CA3AF',
        accent: '#FBBF24',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
