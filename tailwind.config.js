/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        card: '#111113',
        'card-body': '#141416',
        elevated: '#1a1a1d',
        stroke: '#242427',
        muted: '#71717a',
        'muted-foreground': '#52525b',
        foreground: '#f4f4f5',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cursor-card': '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
        'cursor-modal': '0 20px 50px -10px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
};
