import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from the identity
        brand: {
          background: '#fffcf2',  // Main background color
          cream: '#FAF8F3',       // Light cream 
          beige: '#F5F0E8',       // Warm beige
          green: '#2a3a21',       // Updated to new green
          'green-dark': '#2a3a21', // Same green
          black: '#1A1A1A',       // Soft black
          'black-light': '#2A2A2A', // Lighter black for subtle elements
        },
        // Studio design system (main site). Mirrors the --eu-* custom
        // properties in app/globals.css.
        eu: {
          cream: '#fffcf2',   // dominant background
          ink: '#1a260e',     // text and dark surfaces
          green: '#2a3a21',   // primary green
          beige: '#F5F0E8',   // soft panels
          sage: '#3d4a33',    // muted text
          stone: '#6b6450',   // softer muted text
          live: '#a9c79a',    // "live" dot on dark
          skin: '#e7e3dd',    // Skin Studio link
        },
        // Skin Studio sub-brand colors
        skin: {
          background: '#e7e3dd',  // Warm neutral background
          text: '#2b3411',        // Deep olive green for text
          accent: '#3a320c',      // Dark brown accent
          cream: '#f5f2ed',       // Light cream for sections
          muted: '#d4cfc7',       // Muted divider color
        },
        // Existing shadcn colors
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        // Self-hosted next/font faces (app/(main)/layout.tsx). Pages without
        // those variables fall back to the same family names as before.
        'serif': ['var(--font-playfair, "Playfair Display")', 'serif'],
        'sans': ['var(--font-inter, "Inter")', 'sans-serif'],
        'playfair': ['var(--font-playfair, "Playfair Display")', 'serif'],
        'skin-serif': ['"Times New Roman"', 'Georgia', 'serif'],
        'skin-sans': ['"Nunito Sans"', 'sans-serif'],
        // next/font variables from app/(main)/layout.tsx, with the same
        // families as fallbacks where those variables are not defined
        display: ['var(--font-playfair, "Playfair Display")', 'Georgia', 'serif'],
        body: ['var(--font-inter, "Inter")', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'eu-sm': '22px',
        'eu-md': '28px',
        'eu-lg': '36px',
        'eu-xl': '44px',
      },
      maxWidth: {
        eu: '1440px',
      },
      transitionTimingFunction: {
        eu: 'cubic-bezier(.2,.8,.2,1)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'spin-slow': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.8s ease-out',
        'fade-down': 'fade-down 0.8s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
        'slide-in-right': 'slide-in-right 1s ease-out',
        'spin-slow': 'spin-slow 30s linear infinite',
      },
      letterSpacing: {
        'widest': '.25em',
        'wider-xl': '.15em',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;