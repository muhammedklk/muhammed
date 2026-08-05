import fs from 'fs';
import path from 'path';

function removePathSync(itemPath) {
  if (!fs.existsSync(itemPath)) return;
  const stat = fs.lstatSync(itemPath);
  if (stat.isDirectory()) {
    fs.readdirSync(itemPath).forEach((file) => {
      removePathSync(path.join(itemPath, file));
    });
    fs.rmdirSync(itemPath);
  } else {
    fs.unlinkSync(itemPath);
  }
}

const targetPaths = [
  'api',
  'src/api',
  'src/pages/admin',
  'src/components/admin',
  'src/components/common/MaintenanceOverlay.jsx',
  'src/components/common/MaintenanceScreen.jsx',
  'src/context/AuthContext.jsx',
  'src/context/MaintenanceContext.jsx',
  'src/utils/maintenanceStatus.js'
];

targetPaths.forEach((p) => {
  try {
    removePathSync(p);
    console.log(`DELETED: ${p}`);
  } catch (err) {
    console.error(`Error deleting ${p}:`, err.message);
  }
});
