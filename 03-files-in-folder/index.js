const fs = require('fs');
const fsPromises = require('fs').promises;

const { stdout } = require('process');
const path = require('path');
async function checkFiles(path) {
  const stats = await fsPromises.stat(path, (err, data) => data);
  if (stats.isFile()) {
    return Math.round(stats.size / 1024) + ' KB';
  } else {
    return null;
  }
}

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  async (err, files) => {
    for (const file of files) {
      if (file.isFile()) {
        let str = '';
        str += file.name.split('.')[0] + ' - ';
        str += file.name.split('.')[1] + ' - ';
        str +=
          (await checkFiles(path.join(__dirname, 'secret-folder', file.name))) +
          '\n';
        stdout.write(str);
      }
    }
  },
);
