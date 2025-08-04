import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'dark': {
          'bg': '#10121A',
          'card': 'rgba(23, 26, 38, 0.7)',
          'border': 'rgba(45, 52, 79, 0.8)',
        },
        'accent': {
          'blue': '#3B82F6',
          'purple': '#8B5CF6',
          'pink': '#EC4899',
        },
        'text': {
          'light': '#E5E7EB',
          'dark': '#9CA3AF',
          'heading': '#F9FAFB',
        },
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.25)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glass-card': {
          'background': 'rgba(23, 26, 38, 0.6)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(45, 52, 79, 0.7)',
          'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
        '.glass-hover': {
          'transition': 'background 0.3s ease, border 0.3s ease, transform 0.3s ease',
          '&:hover': {
            'background': 'rgba(28, 32, 46, 0.75)',
            'border': '1px solid rgba(59, 130, 246, 0.6)',
            'transform': 'translateY(-2px) scale(1.01)',
          },
        },
      })
    })
  ],
}
