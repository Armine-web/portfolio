/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'avatar-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(180, 120, 70, 0.35)' },
          '50%': { boxShadow: '0 0 28px 4px rgba(212, 170, 120, 0.45)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'avatar-glow': 'avatar-glow 2.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.55s ease-out forwards',
      },
    },
  },
  plugins: [],
}
