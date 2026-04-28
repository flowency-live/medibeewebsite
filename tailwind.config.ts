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
        // === DARK THEME BASE ===
        'void': {
          DEFAULT: '#0D0D0D',     // Deepest black - body background
          light: '#141414',       // Slightly elevated surfaces
          medium: '#1A1A1A',      // Card backgrounds
          elevated: '#242424',    // Hover states, active cards
        },

        // === PRIMARY GOLD (signature color) ===
        'gold': {
          DEFAULT: '#D4AF37',     // Primary gold - CTAs, highlights
          light: '#F5C542',       // Light gold - hover states
          soft: '#E5D7A2',        // Soft gold - secondary text
          dim: '#A08829',         // Dimmed gold - subtle accents
          muted: 'rgba(212, 175, 55, 0.15)', // Background tints
        },

        // === NEUTRAL SCALE ===
        'ash': {
          DEFAULT: '#8A8A8A',     // Secondary text
          light: '#B0B0B0',       // Tertiary text
          dark: '#5A5A5A',        // Disabled text
          border: '#2A2A2A',      // Borders
          'border-light': '#3A3A3A', // Elevated borders
        },

        // === TEXT COLORS ===
        'pearl': {
          DEFAULT: '#FFFFFF',     // Primary text
          soft: '#F5F5F5',        // Body text
          muted: '#CCCCCC',       // Secondary body
        },

        // === STATUS COLORS ===
        'status': {
          'verified': '#4ADE80',    // Green - verified/success
          'pending': '#FBBF24',     // Amber - pending/warning
          'expired': '#F87171',     // Red - expired/error
          'active': '#60A5FA',      // Blue - active/info
          'premium': '#D4AF37',     // Gold - premium tier
        },

        // === TIER COLORS ===
        'tier': {
          'cell': '#5A5A5A',        // Free tier - neutral grey
          'hive': '#D4AF37',        // Paid tier - gold
          'colony': '#818CF8',      // Employer tier - indigo
        },

        // === DEPRECATED COLORS - DO NOT USE IN NEW CODE ===
        // Migration: Replace with void/gold/ash/pearl equivalents
        // These will be removed in a future release
        // @deprecated Use text-ash instead of text-slate-blue
        'slate-blue': {
          DEFAULT: '#696F8B',
          light: '#7d8299',
          dark: '#545971',
        },
        // @deprecated Use bg-void-medium instead
        'deep-slate': '#3d4259',
        // @deprecated Use gold-soft instead
        'soft-gold': '#F5E6A3',
        // @deprecated Use gold instead (#D4AF37)
        'rich-gold': '#E5C55C',
        // @deprecated Use bg-void-light instead
        'mist': '#F5F4F0',
        // @deprecated Use border-ash-border instead
        'neutral-grey': '#9A999B',
        // @deprecated Use text-pearl instead
        'ink': '#09080A',
        // @deprecated Use bg-void instead
        'cream': '#FDFCF8',
        // @deprecated Use bg-void-medium instead
        'midnight': '#1a1d2e',
        // @deprecated Use bg-void-elevated instead
        'midnight-light': '#2a2e42',

        // Provider/HCA audience colors (retained for audience differentiation)
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

        // === BRAND ALIASES (for component compatibility) ===
        // These map brand-* classes to the primary color system
        'brand': {
          dark: '#0D0D0D',          // void
          slate: '#1A1A2E',         // dark slate for cards
          gold: '#D4AF37',          // gold
          'gold-light': '#F5C542',  // gold-light
          pearl: '#FFFFFF',         // pearl
          'pearl-soft': '#F5F5F5',  // pearl-soft
          'pearl-muted': '#CCCCCC', // pearl-muted
        },

        // === PORTAL COLORS (dark theme migration) ===
        // Portals now use dark theme - these provide compatibility
        'portal': {
          stone: '#141414',         // void-light (page backgrounds)
          'blue-dark': '#0D0D0D',   // void (header backgrounds)
          'blue': '#1A1A1A',        // void-medium (elevated surfaces)
          graphite: '#8A8A8A',      // ash (secondary text)
          'graphite-muted': '#5A5A5A', // ash-dark (disabled text)
          highlight: '#D4AF37',     // gold (for notifications/badges)
        },

        // === SURFACE SCALE (semantic elevations) ===
        'surface': {
          0: '#0D0D0D',   // Base level (void)
          1: '#141414',   // Level 1 (void-light)
          2: '#1A1A1A',   // Level 2 (void-medium)
          3: '#242424',   // Level 3 (void-elevated)
        },
      },

      fontFamily: {
        // Primary font: Inter (unified across site)
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        // Portal uses same font (alias for consistency)
        portal: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display sizes - tech platform scale
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
        // Portal typography
        'portal-name': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'portal-heading': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'portal-body': ['1rem', { lineHeight: '1.55' }],
        'portal-meta': ['0.8125rem', { lineHeight: '1.5' }],
      },

      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },

      maxWidth: {
        content: '1140px',
        prose: '680px',
        'portal': '640px',
      },

      borderWidth: {
        '3': '3px',
      },

      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
      },

      boxShadow: {
        // Dark theme shadows (more pronounced for visibility)
        'card': '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-elevated': '0 8px 24px rgba(0, 0, 0, 0.5), 0 16px 48px rgba(0, 0, 0, 0.35)',
        // Gold glow for premium elements
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.15)',
        'gold-glow-sm': '0 0 10px rgba(212, 175, 55, 0.25)',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
        'portal': '200ms', // Portal transition duration alias
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
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' },
        },
        // Enhanced entrance animations
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'expand-blur': {
          '0%': { opacity: '0', transform: 'scale(0.95)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        // Card hover lift
        'lift': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },

      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        // Enhanced animations
        'slide-in-left': 'slide-in-left 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.4s ease-out forwards',
        'expand-blur': 'expand-blur 0.5s ease-out forwards',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
      },

      backgroundImage: {
        // Hexagonal pattern for dark theme
        'hex-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23D4AF37' stroke-opacity='0.08' stroke-width='1'/%3E%3C/svg%3E")`,
        // Gradient overlays
        'gradient-radial-gold': 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        'gradient-dark-top': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
        'gradient-dark-bottom': 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
