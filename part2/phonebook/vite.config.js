import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fullstackopen-part3-patient-glitter-555.fly.dev/',
        changeOrigin: true,
      }
    }
  }
})
