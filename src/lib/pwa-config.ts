import { type VitePWAOptions } from 'vite-plugin-pwa';

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets: [
    'favicon.ico',
    'favicon.png',
    'robots.txt',
    'apple-touch-icon.png',
  ],
  manifest: {
    name: 'Calculadora Ciclos de Sueño - Temporia',
    short_name: 'Temporia',
    description: 'La mejor Calculadora para saber cuales son las mejores para acostarse y levantarse, sin anuncios, rápida y sin acceso a internet.',
    theme_color: '#0b0a1e',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: 'icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-384x384.png',
        sizes: '284x284',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
  },
};