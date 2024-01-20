const { readdir, mkdir, copyFile, rm } = require('fs/promises');
const path = require('path');
const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'copy-files');

(async function () {
  try {
    await rm(dest, { recursive: true, force: true });
    await mkdir(dest, { recursive: true });
    readdir(src).then((files) => {
      for (const file of files) {
        const src = path.join(__dirname, 'files', file);
        const dest = path.join(__dirname, 'copy-files', file);

        copyFile(src, dest);
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
