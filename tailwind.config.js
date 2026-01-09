/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React 文件
    "./public/index.html",         // HTML 文件
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      colors:{
        // 主要顏色
        primary:'var(--primary)',
        primaryLight1: 'var(--primaryLight1)', //最亮
        primaryLight2: 'var(--primaryLight2)',
        secondary: 'var(--secondary)',
        secondaryLight1: 'var(--secondaryLight1)',
        warning: 'var(--warning)',
        warningLight1: 'var(--warningLight1)',
        lightAccent1:'var(--lightAccent1)', //最亮
        lightAccent2: 'var(--lightAccent2)',
        lightAccent3: 'var(--lightAccent3)',

        // 類別顏色
        'category-purple': 'var(--category-purple)',
        'category-blue': 'var(--category-blue)',
        'category-yellow': 'var(--category-yellow)',
        'category-pink': 'var(--category-pink)',
        'category-green': 'var(--category-green)',
      },
      screens: {
        'sm': {'min': '640px'}, 
        'md': {'min': '800px'}, 
        'lg': {'min': '1024px'}, 
        'xl': {'min': '1200px'}, 
      },
    },
  },
  plugins: [],
};
