import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  site: 'https://esg-miball.businesstoday.com.tw/',
  base: '/2026/cop31/',
  plugins: [
    vue(),
    tailwindcss()
  ],
})
