/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        accentfg: 'rgb(var(--c-accent-fg) / <alpha-value>)',
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        primaryfg: 'rgb(var(--c-primary-fg) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        success: 'rgb(var(--c-success) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Tahoma', 'system-ui', 'sans-serif'],
        quran: ['"Amiri Quran"', '"Amiri"', 'serif'],
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
};
