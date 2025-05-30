import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['frontend-project-12-rr1a.onrender.com'],
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001'
      }
    }
  }
})
