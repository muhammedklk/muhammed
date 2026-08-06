import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // 1. Copy static assets to public & client/public
  const assetsDir = path.join(rootDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    copyDirSync(assetsDir, path.join(rootDir, 'public/assets'));
    copyDirSync(assetsDir, path.join(rootDir, 'client/public/assets'));
    console.log('Successfully copied assets with absolute paths!');
  }

  // 2. Sync src -> client/src to prevent missing file build errors on Vercel
  const srcDir = path.join(rootDir, 'src');
  const clientSrcDir = path.join(rootDir, 'client/src');
  if (fs.existsSync(srcDir)) {
    copyDirSync(srcDir, clientSrcDir);
    console.log('Successfully synced src to client/src!');
  }
} catch (err) {
  console.error('Error copying assets/syncing src:', err);
}
