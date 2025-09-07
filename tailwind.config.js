module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      hpr: ["MomsFont", "serif"]
    },
    boxShadow: {
      "custom-light": "0 0 10px #313131",
      "custom-dark": "5px 5px 10px #0a0c0e, -5px -5px 10px #14161c",
      "hover": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "hover-dark": "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: "#eff6ff",
          100: "#dbeafe", 
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#0b5394", // Main brand color
          600: "#094a85",
          700: "#083f70",
          800: "#07345c",
          900: "#062947",
        },
        // Legacy colors for compatibility
        green: {
          DEFAULT: "#0b5394",
        },
        blue: {
          DEFAULT: "#0b5394",
          50: "#eff6ff",
          100: "#dbeafe", 
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#0b5394",
          600: "#094a85",
          700: "#083f70",
          800: "#07345c",
          900: "#062947",
        },
        beige: {
          DEFAULT: "#f5f5dc",
          50: "#fefef9",
          100: "#fdfdf2",
          200: "#faf9e6",
          300: "#f7f5d9",
          400: "#f5f5dc",
          500: "#f0f0c8",
          600: "#e6e6b8",
          700: "#d9d9a3",
          800: "#cccc8f",
          900: "#b8b87a",
        },
        dark: {
          DEFAULT: "#0b5394",
          50: "#f8fafc",
          100: "#0a0b0e",
          200: "#16181d",
          300: "#1e2025",
          400: "#262930",
          500: "#0f1115",
          600: "#374151",
          700: "#202125",
          800: "#1f2937",
          900: "#111827",
        },
        // Semantic colors
        success: {
          50: "#f0fdf4",
          500: "#10b981",
          600: "#059669",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      // 4px base grid spacing system
      spacing: {
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px - base unit
        '1.5': '0.375rem',  // 6px
        '2': '0.5rem',      // 8px
        '2.5': '0.625rem',  // 10px
        '3': '0.75rem',     // 12px
        '3.5': '0.875rem',  // 14px
        '4': '1rem',        // 16px
        '5': '1.25rem',     // 20px
        '6': '1.5rem',      // 24px
        '7': '1.75rem',     // 28px
        '8': '2rem',        // 32px
        '9': '2.25rem',     // 36px
        '10': '2.5rem',     // 40px
        '11': '2.75rem',    // 44px
        '12': '3rem',       // 48px
        '14': '3.5rem',     // 56px
        '16': '4rem',       // 64px
        '18': '4.5rem',     // 72px
        '20': '5rem',       // 80px
        '22': '5.5rem',     // 88px
        '24': '6rem',       // 96px
      },
      // Standardized animation timing
      transitionDuration: {
        'fast': '150ms',
        'standard': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // Animation keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-smooth',
        'slide-in': 'slide-in 300ms ease-smooth',
        'scale-in': 'scale-in 300ms ease-smooth',
        'pulse-subtle': 'pulse-subtle 2s ease-smooth infinite',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
  plugins: [],
};
