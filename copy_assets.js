import fs from 'fs';
import path from 'path';

function copyDirSync(src, dest) {
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
  copyDirSync('assets', 'public/assets');
  copyDirSync('assets', 'client/public/assets');
  console.log('Successfully copied assets to public/assets and client/public/assets!');
} catch (err) {
  console.error('Error copying assets:', err);
}
