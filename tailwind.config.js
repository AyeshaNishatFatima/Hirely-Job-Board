/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cool paper background for light mode, ink-navy for dark mode
        paper: '#F6F7FB',
        ink: {
          DEFAULT: '#12141C',
          soft: '#3A3D4A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#161923',
        },
        base: {
          dark: '#0E1116',
        },
        // Signal blue — primary brand accent
        signal: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#5B6EF5',
          600: '#3D4FE0',
          700: '#2F3EB8',
          800: '#283190',
          900: '#232B73',
        },
        // Amber highlight — used sparingly for "featured" marks
        highlight: {
          DEFAULT: '#F59E0B',
          soft: '#FDE9C8',
        },
        success: '#16A34A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 20, 28, 0.04), 0 8px 24px -12px rgba(18, 20, 28, 0.12)',
        cardHover: '0 4px 8px rgba(18, 20, 28, 0.06), 0 16px 32px -12px rgba(91, 110, 245, 0.24)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeUp: 'fadeUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
