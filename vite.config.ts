import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

//@ts-ignore

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      "@containers": path.resolve(__dirname, './src/containers'),
      "@components": path.resolve(__dirname, './src/components'),
    }
  },
})
