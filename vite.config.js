import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works on GitHub Pages (/grayeagle3/) or any host.
export default defineConfig({
  plugins: [react()],
  base: './',
})
