
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
        arabic: ['Cairo', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'cv-teal': '#64FFDA',
        'cv-pine': '#074F57',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-from-left': {
            '0%': { opacity: '0', transform: 'translateX(50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
            '0%': { opacity: '0', transform: 'translateX(-50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'blob-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20%, -20%) scale(1.1)' },
          '50%': { transform: 'translate(0, 20%) scale(1)' },
          '75%': { transform: 'translate(-20%, -20%) scale(0.9)' },
        },
        'blob-2': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '25%': { transform: 'translate(-20%, 20%) scale(1.1)' },
            '50%': { transform: 'translate(0, -20%) scale(1)' },
            '75%': { transform: 'translate(20%, 20%) scale(0.9)' },
        },
        'blob-3': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '25%': { transform: 'translate(10%, 30%) scale(1.1)' },
            '50%': { transform: 'translate(-20%, -10%) scale(1)' },
            '75%': { transform: 'translate(15%, -25%) scale(0.9)' },
        },
        'blob-4': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '25%': { transform: 'translate(-15%, 10%) scale(1.1)' },
            '50%': { transform: 'translate(10%, -20%) scale(1)' },
            '75%': { transform: 'translate(-10%, 15%) scale(0.9)' },
        },
        'blob-5': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-25%, 15%) scale(1.1)' },
          '66%': { transform: 'translate(20%, -15%) scale(0.9)' },
        },
        'blob-6': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(15%, 25%) scale(0.9)' },
          '66%': { transform: 'translate(-15%, -20%) scale(1.1)' },
        },
        'slide-in-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-out-up-fade': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
        'progress-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'slide-in-from-left': 'slide-in-from-left 0.5s ease-out forwards',
        'slide-in-from-right': 'slide-in-from-right 0.5s ease-out forwards',
        'blob-1': 'blob-1 8s infinite ease-in-out',
        'blob-2': 'blob-2 10s infinite ease-in-out',
        'blob-3': 'blob-3 12s infinite ease-in-out',
        'blob-4': 'blob-4 14s infinite ease-in-out',
        'blob-5': 'blob-5 9s infinite ease-in-out',
        'blob-6': 'blob-6 11s infinite ease-in-out',
        'slide-in-up-fade': 'slide-in-up-fade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-out-up-fade': 'slide-out-up-fade 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards',
        'progress-bar': 'progress-bar 5s linear forwards',
        'marquee-scroll': 'marquee-scroll 20s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
