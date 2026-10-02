import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  site: 'https://esg.businesstoday.com.tw',
  base: '/2025/cop30/',
  plugins: [
    vue(),
    tailwindcss()
  ],
})
