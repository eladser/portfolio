/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 'Inter Fallback' is a metric-matched Arial (see src/fonts.css) so the swap
        // from fallback to Inter doesn't reflow text.
        sans: ['Inter', 'Inter Fallback', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
