/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': '#00ff88',
        'matrix-cyan': '#00d9ff',
        'matrix-purple': '#7b2ff7',
        'matrix-dark': '#0a0e1a',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'space': ['Space Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
