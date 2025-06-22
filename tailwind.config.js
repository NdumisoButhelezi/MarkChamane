/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors for more contrast
        darkBg: '#0a0a0a',
        darkCard: '#18181b',
        darkAccent: '#1e293b',
        darkText: '#f1f5f9',
        darkMuted: '#64748b',
        darkAmber: '#fbbf24',
      },
    },
  },
  plugins: [],
};
