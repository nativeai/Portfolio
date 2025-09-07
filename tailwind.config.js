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
      "custom-light": " 0 0 10px #313131",
      "custom-dark": "5px 5px 10px #0a0c0e , -5px -5px 10px #14161c",
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
        green: {
          DEFAULT: "#0b5394",
        },
        blue: {
          DEFAULT: "#0b5394",
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
          100: "#0a0b0e",
          200: "#16181d",
          300: "#16181d",
          500: "#0f1115",
          700: "#202125",
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
  plugins: [],
};
