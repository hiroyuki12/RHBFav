import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react(),
    VitePWA({
      includeAssets: [
        'offline.html',
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        theme_color: '#000',
        background_color: '#000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'RHBFav',
        description:
          'RHBFav',
        name: 'RHBFav',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ]
})
