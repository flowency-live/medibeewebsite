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
        // === Marketing Site Colors (unchanged) ===
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
        'midnight': '#1a1d2e',
        'midnight-light': '#2a2e42',
        'provider': {
          DEFAULT: '#4A6FA5',
          light: '#5B82B8',
          dark: '#3A5C8C',
        },
        'hca': {
          DEFAULT: '#E5C55C',
          light: '#F5E6A3',
          dark: '#C9A94A',
        },
        // === Portal Design System (Low-Saturation Trust Palette) ===
        'portal': {
          // Deep calm blue - authority + trust
          'blue': {
            DEFAULT: '#3B4A6B',
            light: '#4A5C82',
            dark: '#2D3A54',
            muted: '#5A6A8A',
          },
          // Soft desaturated teal - care + approachability
          'teal': {
            DEFAULT: '#4A7B7D',
            light: '#5A9194',
            dark: '#3A6163',
            muted: '#6A9B9D',
          },
          // Warm stone backgrounds
          'stone': {
            DEFAULT: '#F7F5F2',
            warm: '#F2EDE6',
            cool: '#FAFAFA',
          },
          // Soft graphite text
          'graphite': {
            DEFAULT: '#3D3D3D',
            light: '#5A5A5A',
            muted: '#7A7A7A',
          },
          // Status colors (muted, not aggressive)
          'verified': '#5A8A6A',       // Muted green
          'available': '#C4A35A',      // Warm amber
          'pending': '#8A7A5A',        // Soft bronze
          'highlight': '#7A6A9A',      // Restrained violet
          'alert': '#9A5A5A',          // Muted red
        },
        // Surface elevation colors
        'surface': {
          '0': '#FFFFFF',
          '1': '#FAFAF8',
          '2': '#F5F4F0',
          '3': '#EFEEE8',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        // Portal uses Inter for high legibility
        portal: ['Inter', 'system-ui', 'sans-serif'],
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
        // Portal typography (per design language)
        'portal-name': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }], // 30px mobile
        'portal-heading': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px
        'portal-body': ['1rem', { lineHeight: '1.55' }], // 16px
        'portal-meta': ['0.8125rem', { lineHeight: '1.5' }], // 13px
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        content: '1140px',
        prose: '680px',
        'portal': '640px', // Single column portal max
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
      },
      boxShadow: {
        // Soft elevation shadows for cards
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
        'card-elevated': '0 4px 12px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'portal': 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Smooth ease-out
      },
      transitionDuration: {
        'portal': '200ms', // Per design language: 180-220ms
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
