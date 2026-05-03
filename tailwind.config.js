module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/talkivo-chat/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      display: ["Playfair Display", "Georgia", "serif"],
      mono: ["Fira Code", "ui-monospace", "monospace"],
      hpr: ["MomsFont", "serif"],
    },
    boxShadow: {
      "custom-light": "0 4px 24px rgba(10,22,40,0.12)",
      "custom-dark": "0 4px 24px rgba(10,22,40,0.4)",
      "hover": "0 10px 25px -5px rgba(10,22,40,0.2), 0 10px 10px -5px rgba(10,22,40,0.1)",
      "hover-dark": "0 10px 25px -5px rgba(10,22,40,0.5), 0 10px 10px -5px rgba(10,22,40,0.3)",
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
        // Navy spectrum — primary brand palette
        primary: {
          50: "#F0F5FC",   // Light BG
          100: "#B8D4F5",  // Frost — light text
          200: "#8FA3BF",  // Slate — subtext
          300: "#6FA3E0",  // Sky Blue — links
          400: "#4A7BC4",  // Steel — hover states
          500: "#2A5298",  // Navy Light — buttons / CTAs
          600: "#1A3A6B",  // Navy Mid — cards / panels
          700: "#0D2147",  // Navy Primary — headers / navbars
          800: "#0A1628",  // Navy Deep — backgrounds / hero
          900: "#06101E",
        },
        // Gold accent
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          50: "#FDF8EC",
          500: "#C9A84C",
          600: "#B8953A",
        },
        // Dark mode surface tokens
        dark: {
          DEFAULT: "#0A1628",
          100: "#0D2147",  // Navy Primary — headers
          200: "#1A3A6B",  // Navy Mid — cards
          300: "#2A5298",  // Navy Light
          400: "#4A7BC4",  // Steel
          500: "#0A1628",  // Navy Deep — bg
          600: "#08111E",
          700: "#060D18",
          800: "#040A12",
          900: "#02070C",
        },
        // Legacy aliases kept for compatibility
        green: { DEFAULT: "#2A5298" },
        blue: {
          DEFAULT: "#2A5298",
          50: "#F0F5FC",
          100: "#B8D4F5",
          200: "#8FA3BF",
          300: "#6FA3E0",
          400: "#4A7BC4",
          500: "#2A5298",
          600: "#1A3A6B",
          700: "#0D2147",
          800: "#0A1628",
          900: "#06101E",
        },
        beige: {
          DEFAULT: "#F0F5FC",
          50: "#fefefe",
          100: "#F8FAFD",
          200: "#F0F5FC",
          300: "#E4EDF8",
          400: "#D4E2F4",
          500: "#C0D3EE",
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
      backgroundImage: {
        'hero': 'linear-gradient(180deg, #0A1628 0%, #2A5298 100%)',
        'card-surface': 'linear-gradient(135deg, #1A3A6B 0%, #4A7BC4 100%)',
        'cta': 'linear-gradient(90deg, #0D2147 0%, #6FA3E0 100%)',
        'gold-accent': 'linear-gradient(90deg, #C9A84C 0%, #E8C97A 100%)',
        'frosted': 'linear-gradient(180deg, rgba(10,22,40,0.9) 0%, rgba(42,82,152,0.6) 100%)',
      },
      // 4px base grid spacing system
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '22': '5.5rem',
        '24': '6rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'standard': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
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
