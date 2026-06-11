/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#243D1F',
          primary: '#3B6D11',
          mid:     '#639922',
          accent:  '#97C459',
          soft:    '#C0DD97',
          tint:    '#EAF3DE',
          base:    '#F4FAE8',
        },
        surface: '#FDFCF9',
        page:    '#F6F4EF',
        border:  '#DDD9CE',
        muted:   '#9A9789',
        ink:     '#1C1C1A',
        risk: {
          high:   '#E24B4A',
          bg:     '#FCEBEB',
          border: '#F7C1C1',
        },
      },
      borderWidth: {
        DEFAULT: '0.5px',
      },
    },
  },
  plugins: [],
}
