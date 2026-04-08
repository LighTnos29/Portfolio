import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Raise warning threshold to 600kb (Three.js chunks are large by nature)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          // React core — always needed
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Animation — loaded on main page
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['lenis'],

          // 3D — only used if referenced; split so it doesn't block anything
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],

          // Charts — only used in AdminDashboard (lazy-loaded anyway)
          'vendor-charts': ['recharts'],

          // Email — only used in ContactPopup
          'vendor-email': ['@emailjs/browser'],
        },
      },
    },

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',

    // Generate source maps only in dev
    sourcemap: false,

    // Target modern browsers (reduces polyfill weight)
    target: 'es2020',
  },

  // Optimise deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lenis'],
  },
})
