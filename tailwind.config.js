/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0A0A',
        'primary-purple': '#7C3AED',
        'violet-accent': '#A78BFA',
        'light-gray': '#E6E6E6',
      },
      fontFamily: {
        'headline': ['Inter', 'Poppins', 'sans-serif'],
        'body': ['Roboto', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7C3AED, 0 0 10px #7C3AED, 0 0 15px #7C3AED' },
          '100%': { boxShadow: '0 0 10px #7C3AED, 0 0 20px #7C3AED, 0 0 30px #A78BFA' },
        },
      },
    },
  },
  plugins: [],
}

