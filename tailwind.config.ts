import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'slate-blue': {
          DEFAULT: '#696F8B',
          light: '#7d8299',
          dark: '#545971',
        },
        'deep-slate': '#3d4259',
        'soft-gold': '#F5E6A3',
        'rich-gold': '#E5C55C',
        mist: '#F5F4F0',
        'neutral-grey': '#9A999B',
        ink: '#09080A',
        'cream': '#FDFCF8',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes - editorial scale
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        // UI sizes
        'ui-sm': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'ui-xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        content: '1140px',
        prose: '680px',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};

export default config;
