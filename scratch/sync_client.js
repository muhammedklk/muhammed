const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const client = path.join(root, 'client');

if (!fs.existsSync(client)) {
  fs.mkdirSync(client, { recursive: true });
}

['src', 'public', 'css', 'assets', 'js'].forEach(folder => {
  const srcPath = path.join(root, folder);
  const destPath = path.join(client, folder);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true });
    console.log(`Copied ${folder} -> client/${folder}`);
  }
});

['index.html', 'vite.config.js'].forEach(file => {
  const srcPath = path.join(root, file);
  const destPath = path.join(client, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} -> client/${file}`);
  }
});

console.log('Client directory synchronization complete!');
