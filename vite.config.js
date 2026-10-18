import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the root of grayeagle3.com with real paths (/condo, /explore, …).
export default defineConfig({
  plugins: [react()],
  base: '/',
})
