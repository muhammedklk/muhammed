const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../public/assets/favicom-img.png');
const targets = [
  path.join(__dirname, '../public/favicon.ico'),
  path.join(__dirname, '../public/favicon.png'),
  path.join(__dirname, '../public/apple-touch-icon.png')
];

targets.forEach(target => {
  fs.copyFileSync(src, target);
  console.log('Copied to:', target);
});
