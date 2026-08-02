/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090909',
          surface: '#111111',
          card: '#181818',
        },
        accent: {
          gold: '#C58A55',
          goldMuted: 'rgba(197, 138, 85, 0.15)',
          cyan: '#7CC8F3',
          cyanMuted: 'rgba(124, 200, 243, 0.15)',
        },
        status: {
          success: '#78B26A',
          danger: '#E05D5D',
        },
        content: {
          primary: '#F5F2EC',
          secondary: '#AAAAAA',
          muted: '#666666',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(197, 138, 85, 0.25)',
        'glow-cyan': '0 0 35px -5px rgba(124, 200, 243, 0.25)',
        'subtle-border': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
