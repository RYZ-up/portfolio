import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Plugin personnalisé pour copier le dossier netlify et le fichier TOML
const copyNetlifyFiles = () => {
  return {
    name: 'copy-netlify-files',
    closeBundle: async () => {
      const distDir = path.resolve(process.cwd(), 'dist');
      const netlifyDir = path.resolve(process.cwd(), 'netlify');
      const tomlFile = path.resolve(process.cwd(), 'netlify.toml');

      // Log public/videos content
      const publicVideosDir = path.resolve(process.cwd(), 'public/videos');
      console.log('\n📹 Checking public/videos directory...');
      if (fs.existsSync(publicVideosDir)) {
        const videoFiles = fs.readdirSync(publicVideosDir);
        console.log(`✅ Found ${videoFiles.length} items in public/videos:`, videoFiles);
        videoFiles.forEach(file => {
          const filePath = path.join(publicVideosDir, file);
          const stats = fs.statSync(filePath);
          if (stats.isFile()) {
            console.log(`   - ${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
          }
        });
      } else {
        console.log('❌ public/videos directory not found!');
      }

      // Log dist/videos content
      const distVideosDir = path.join(distDir, 'videos');
      console.log('\n📹 Checking dist/videos directory...');
      if (fs.existsSync(distVideosDir)) {
        const distVideoFiles = fs.readdirSync(distVideosDir);
        console.log(`✅ Found ${distVideoFiles.length} items in dist/videos:`, distVideoFiles);
        distVideoFiles.forEach(file => {
          const filePath = path.join(distVideosDir, file);
          const stats = fs.statSync(filePath);
          if (stats.isFile()) {
            console.log(`   - ${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
          }
        });
      } else {
        console.log('❌ dist/videos directory not found!');
      }

      // Copier netlify.toml
      if (fs.existsSync(tomlFile)) {
        fs.copyFileSync(tomlFile, path.join(distDir, 'netlify.toml'));
        console.log('✅ netlify.toml copied to dist');
      }

      // Copier le dossier netlify
      if (fs.existsSync(netlifyDir)) {
        const destNetlifyDir = path.join(distDir, 'netlify');

        // Fonction récursive de copie
        const copyRecursive = (src, dest) => {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

          fs.readdirSync(src).forEach(childItemName => {
            const srcPath = path.join(src, childItemName);
            const destPath = path.join(dest, childItemName);
            const stats = fs.statSync(srcPath);

            if (stats.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          });
        };

        copyRecursive(netlifyDir, destNetlifyDir);
        console.log('✅ netlify folder copied to dist');
      }
    }
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), copyNetlifyFiles()],
  build: {
    // Augmenter la limite avant avertissement
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Séparer les dépendances volumineuses en chunks différents
        manualChunks: (id) => {
          // React et React DOM
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Three.js et composants React Three Fiber
          if (id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')) {
            return 'three-vendor';
          }
          // Firebase
          if (id.includes('node_modules/firebase') ||
            id.includes('node_modules/@firebase')) {
            return 'firebase-vendor';
          }
          // Resend
          if (id.includes('node_modules/resend')) {
            return 'resend-vendor';
          }
        }
      }
    },
    // Optimisation avec esbuild (plus rapide que terser et déjà inclus)
    minify: 'esbuild',
    target: 'es2015'
  },
  // Supprimer console.log uniquement en production
  esbuild: {}
}))
