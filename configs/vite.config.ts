import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '../src',
  plugins: [react()],
  base: '/camo/', // GitHub Pages base URL
  publicDir: '../public',
  css: {
    postcss: '.',
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})
