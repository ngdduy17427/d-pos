/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "glb-color": "var(--glb-color)",
        "glb-color-active": "var(--glb-color-active)",
      },
    },
  },
  plugins: [],
};
