/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Keep your custom colors as extensions, not replacements
      colors: {
        'custom-grey': {
          'darkest': '#3d4852',
          'darker': '#606f7b',
          'dark': '#8795a1',
          'default': '#b8c2cc',
          'light': '#dae1e7',
          'lighter': '#f1f5f8',
          'lightest': '#f8fafc',
        },
        'custom-red': {
          'darkest': '#3b0d0c',
          'darker': '#621b18',
          'dark': '#cc1f1a',
          'default': '#e3342f',
          'light': '#ef5753',
          'lighter': '#f9acaa',
          'lightest': '#fcebea',
        },
        'custom-orange': {
          'darkest': '#462a16',
          'darker': '#613b1f',
          'dark': '#de751f',
          'default': '#f6993f',
          'light': '#faad63',
          'lighter': '#fcd9b6',
          'lightest': '#fff5eb',
        },
        // Add other custom colors here with different names
      },
      width: {
        '1/6': '16.66667%',
        '5/6': '83.33333%',
      },
      maxWidth: {
        '2xl': '70rem',
        '3xl': '80rem',
        '4xl': '90rem',
        '5xl': '100rem',
      },
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        'outline': '0 0 0 3px rgba(52,144,220,0.5)',
      },
    },
  },
  plugins: [],
}