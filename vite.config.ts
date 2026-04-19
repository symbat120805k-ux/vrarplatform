import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** MindAR 1.2.5 ожидает Three.js до r152 (sRGBEncoding). Патчим под текущий three. */
function mindarThreeEncodingPatch(): Plugin {
  return {
    name: 'mindar-three-outputcolorspace',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('mindar-image-three.prod.js')) return null
      if (!code.includes('sRGBEncoding')) return null
      return code
        .replace(/sRGBEncoding as Si/g, 'SRGBColorSpace as Si')
        .replace(/this\.renderer\.outputEncoding = Si/g, 'this.renderer.outputColorSpace = Si')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [mindarThreeEncodingPatch(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Иначе Rolldown pre-bundle тянет mind-ar без нашего transform — падает на sRGBEncoding.
  optimizeDeps: {
    exclude: ['mind-ar'],
  },
})
