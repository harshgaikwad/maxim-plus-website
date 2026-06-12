import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Code splitting for better LCP / TTI ──────────────────────
    rollupOptions: {
      output: {
      },
    },

    // ── Asset inlining threshold (images < 4kb inlined as base64) ─
    assetsInlineLimit: 4096,

    // ── Minification ──────────────────────────────────────────────
    minify: 'esbuild',

    // ── CSS code splitting per chunk ──────────────────────────────
    cssCodeSplit: true,

    // ── Reduce chunk size warning noise ───────────────────────────
    chunkSizeWarningLimit: 600,
  },

  // ── Dev server ────────────────────────────────────────────────────
  server: {
    port: 5173,
    headers: {
      // ── Anti-Clickjacking ────────────────────────────────────────
      'X-Frame-Options': 'DENY',
      // ── MIME Sniffing Prevention ─────────────────────────────────
      'X-Content-Type-Options': 'nosniff',
      // ── XSS Protection (legacy browsers) ────────────────────────
      'X-XSS-Protection': '1; mode=block',
      // ── Referrer Policy ─────────────────────────────────────────
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // ── Permissions Policy ───────────────────────────────────────
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
      // ── COOP / CORP ──────────────────────────────────────────────
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-site',
    },
  },

  // ── Preview server (for production build testing) ─────────────────
  preview: {
    port: 4173,
    headers: {
      // Long cache for hashed assets
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
