/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#64748B',
        ascent: '#F59E0B',
        background: '#F9FAFB',
        surface: '#E5E7EB',
        text: '#111827',
        success: '#22C55E',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
};
