// This theme config is not in use excluded

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,hbs,js}'],
  safelist: [

  ],
  theme: {
    extend: {
      colors: {
        ui: {
          light: '#FFF',
          medium: '#D9D9D9',
          dark: '#212121',
        },
        devdays: {
          primary: "#202F5A",
          secondary: "#EB545B",
          teritary: "#283D79"
        }
      },
      gridTemplateColumns: {
        '1-2': '1fr 2fr',
      },
      boxShadow: {
        'schatten': '0 20px 60px rgba(21, 14, 117, 0.3)',
      },
      fontSize: {
        'h1': ['130px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        'h2': ['100px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        'h3': ['80px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        'h4': ['60px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        'h5': ['45px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        'h6': ['30px', {
          lineHeight: '1em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],
        
        'default': ['18px', {
          lineHeight: '1.6em',
          letterSpacing: '0em',
          fontWeight: '400'
        }],

        // 'somevar': ['size', {options}],
      },
      BorderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      spacing: {},
    },
    screens: {
      'tiny': '480px',
      // => @media (min-width: 480px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
};
