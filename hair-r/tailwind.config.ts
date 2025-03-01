/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 使用 class 切換深色模式
  theme: {
    extend: {
      colors: {
        // 新增基於你的 meme 風格的顏色變量
        'meme-purple': 'var(--meme-purple)',
        'meme-pink': 'var(--meme-pink)',
        'meme-yellow': 'var(--meme-yellow)',
        'meme-green': 'var(--meme-green)',
        'meme-blue': 'var(--meme-blue)',
        'meme-red': 'var(--meme-red)',
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'primary': 'var(--card-border)',
      },
    },
  },
  plugins: [],
}