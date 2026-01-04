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
      fontSize: {
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)', 
        lg: 'var(--font-size-lg)', 
        xl: 'var(--font-size-xl)', 
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)', 
        '4xl': ['var(--font-size-4xl)', { fontWeight: '700' }],
        '5xl': 'var(--font-size-5xl)', 
      },
      screens: {
        'sm': {'max': '640px'}, // 小於 640px 時生效
        'md': {'max': '800px'}, // 小於 768px 時生效
        'lg': {'max': '1024px'}, // 小於 1024px 時生效
        'xl': {'max': '1200px'}, // 小於 1200px 時生效
      },
    },
  },
  plugins: [],
};
