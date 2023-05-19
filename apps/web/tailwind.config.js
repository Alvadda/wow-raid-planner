/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        discord: '#7289da',
        'class-warrior': '#C79C6E',
        'class-paladin': '#F58CBA',
        'class-hunter': '#ABD473',
        'class-rogue': '#FFF569',
        'class-priest': '#FFFFFF',
        'class-death-knight': '#C41F3B',
        'class-shaman': '#0070DE',
        'class-mage': '#69CCF0',
        'class-warlock': '#9482C9',
        'class-monk': '#00FF96',
        'class-druid': '#FF7D0A',
        'class-demon-hunter': '#A330C9',
      },
    },
  },
  plugins: [],
}
