const { readdir, readFile, writeFile, rm } = require('fs/promises');
const path = require('path');

async function getStyles() {
  const files = await readdir(path.join(__dirname, 'styles'));
  await rm(path.join(__dirname, 'project-dist', 'bundle.css'), {
    recursive: true,
    force: true,
  });
  let filesContent = '';
  for (const file of files) {
    if (path.extname(file) == '.css') {
      const content = await readFile(path.join(__dirname, 'styles', file));
      filesContent += content.toString() + '\n';
    }
  }
  writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), filesContent);
}
getStyles();
