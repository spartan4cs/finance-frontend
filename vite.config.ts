import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to backend to avoid CORS during development
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // keep the /api prefix so backend routes remain the same
      },
    },
  },
})
