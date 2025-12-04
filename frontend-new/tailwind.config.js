/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors - deep teals
        'saejaedang': {
          'deep': '#0e3d39',      // Darkest teal
          'primary': '#1d5c52',    // Main teal
          'medium': '#19322e',     // Dark subdued
          'light': '#446b5a',      // Lighter teal
        },
        // Traditional Korean accent colors
        'hanok': {
          'ivory': '#f0e6d2',      // Soft ivory (traditional paper)
          'beige': '#e3c892',      // Warm beige (clay)
          'gold': '#b37a42',       // Golden accent (bronze)
          'sand': '#d4c5a9',       // Sand tone
        },
        // Semantic colors
        'korean': {
          'paper': '#faf8f3',      // Background paper texture
          'ink': '#2d2d2d',        // Text color (ink)
          'red': '#c73e3a',        // Traditional red accent
        }
      },
      fontFamily: {
        'korean': ['Noto Serif KR', 'serif'],
        'display': ['Gowun Batang', 'serif'],
        'sans': ['Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        'hanok': '0.75rem',      // Soft curves
        'ceramic': '2rem',       // Pottery-like curves
      },
      boxShadow: {
        'hanok': '0 4px 20px rgba(29, 92, 82, 0.1)',
        'ceramic': '0 8px 30px rgba(14, 61, 57, 0.15)',
        'paper': '0 2px 10px rgba(45, 45, 45, 0.05)',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E\")",
        'gradient-hanok': 'linear-gradient(135deg, #1d5c52 0%, #0e3d39 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f0e6d2 0%, #e3c892 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
