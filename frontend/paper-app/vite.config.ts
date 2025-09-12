import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true,             // listen on all network interfaces
    port: 5173,
    strictPort: true,
    watch:{
      usePolling: true,
    },
    hmr: {
      host: 'localhost',    // optional if using HMR from host
    },
    // Allow the Docker service name used by Nginx
    allowedHosts: ['frontend', 'localhost', '127.0.0.1'],
  },
})
