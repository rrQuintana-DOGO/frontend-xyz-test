import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

//@ts-ignore

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
          target: 'http://52.204.245.232:8000', // URL de tu backend
          changeOrigin: true, // Cambia el encabezado "Origin" para coincidir con el backend
          secure: false, // Ignora los problemas de certificados SSL (en caso de backend HTTPS con cert. autofirmados)
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      "@containers": path.resolve(__dirname, './src/containers'),
      "@components": path.resolve(__dirname, './src/components'),
      "@logic": path.resolve(__dirname, './src/logic'),
      "@utilis": path.resolve(__dirname, './src/utilis'),
      "@config": path.resolve(__dirname, './src/config'),
    }
  },
})
