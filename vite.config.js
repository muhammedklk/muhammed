import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Auto-copy uploaded Elve images to public assets on Vite build/dev
try {
  const img1 = 'C:/Users/MY PC/.gemini/antigravity-ide/brain/5fd61c64-e1bc-4c72-94fe-265cd4a0c913/media__1786081314191.jpg';
  const img2 = 'C:/Users/MY PC/.gemini/antigravity-ide/brain/5fd61c64-e1bc-4c72-94fe-265cd4a0c913/media__1786081314192.jpg';
  if (fs.existsSync(img1)) {
    const dirs = [
      path.resolve(__dirname, 'public/assets/portfolio'),
      path.resolve(__dirname, '../public/assets/portfolio')
    ];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(img1, path.join(dir, '2-elve.jpg'));
      fs.copyFileSync(img1, path.join(dir, 'elve-hero.jpg'));
      if (fs.existsSync(img2)) {
        fs.copyFileSync(img2, path.join(dir, 'elve-showcase.jpg'));
      }
    });
  }
} catch (e) {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
