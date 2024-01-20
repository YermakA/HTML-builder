const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

async function getFiles() {
  const files = await readdir(path.join(__dirname, 'styles'));

  let filesContent = '';
  for (const file of files) {
    if (path.extname(file) == '.css') {
      const content = await readFile(path.join(__dirname, 'styles', file));
      filesContent += content.toString() + '\n';
    }
  }
  writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), filesContent);
}
getFiles();
