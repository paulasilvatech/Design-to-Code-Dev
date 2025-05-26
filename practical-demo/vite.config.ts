import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Conditionally import visualizer only if it's installed
let visualizer: any;
try {
  visualizer = require('rollup-plugin-visualizer').visualizer;
} catch {
  visualizer = null;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer && visualizer({
      template: 'treemap',
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html'
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'styled-vendor': ['styled-components']
        }
      }
    }
  }
}) 