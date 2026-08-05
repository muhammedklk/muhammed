import fs from 'fs';
import path from 'path';

function removeDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

try {
  removeDirSync('api');
  console.log('SUCCESS: api folder completely deleted!');
} catch (err) {
  console.error('Error removing api folder:', err.message);
}
