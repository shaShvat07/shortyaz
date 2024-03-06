/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/Navbar/Navbar.tsx",
    "./src/components/App.tsx",
    "./src/components/Home/Home.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'elite-black': '#0B101B',
        'dark-gray': '#181E29',
        'lite-gray': '#C9CED6',
        'bright-blue': '#144EE3',
        'bright-pink': '#EB568E',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.before': {
          content: "''",
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
        },
        '.after': {
          content: "''",
          position: 'absolute',
          top: 0,
          right: '-100%',
          width: '100%',
          height: '100%',
        },
        '.group:hover .before': {
          left: '100%',
        },
        '.group:hover .after': {
          right: '100%',
        },
      };

      addUtilities(newUtilities, ['before', 'after', 'group', 'group-hover']);
    },
  ],
};
