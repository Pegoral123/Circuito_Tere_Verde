import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Circuito Verde Teresópolis',
        short_name: 'CVT',
        description: 'Meu aplicativo PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable' // <-- Adiciona isso aqui!
          },
          {
            src: '/logo_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // <-- E aqui também!
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});