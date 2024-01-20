const {
  rm,
  mkdir,
  readFile,
  readdir,
  writeFile,
  copyFile,
} = require('fs/promises');
const path = require('path');

const project = path.join(__dirname, 'project-dist');

async function createIndexHTML() {
  try {
    let template = (
      await readFile(path.join(__dirname, 'template.html'))
    ).toString();

    const components = await readdir(path.join(__dirname, 'components'));
    for (const comp of components) {
      if (path.extname(comp) == '.html') {
        const compContent = await readFile(
          path.join(__dirname, 'components', comp),
        );
        const re = new RegExp(`{{2} *${comp.split('.')[0]} *}{2}`, 'g');
        template = template.replaceAll(re, compContent.toString());
      }
    }

    await writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template,
    );
  } catch (err) {
    console.log(err);
  }
}

async function mergeStyles() {
  const files = await readdir(path.join(__dirname, 'styles'));

  let filesContent = '';
  for (const file of files) {
    if (path.extname(file) == '.css') {
      const content = await readFile(path.join(__dirname, 'styles', file));
      filesContent += content.toString() + '\n';
    }
  }
  await writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
    filesContent,
  );
}

async function createFiles(baseDirectory, src) {
  const data = await readdir(src, { withFileTypes: true });

  for (const obj of data) {
    if (obj.isDirectory()) {
      await mkdir(path.join(baseDirectory, obj.name), {
        recursive: true,
      });
      await createFiles(
        path.join(baseDirectory, obj.name),
        path.join(obj.path, obj.name),
      );
    } else if (obj.isFile()) {
      await copyFile(
        path.join(obj.path, obj.name),
        path.join(baseDirectory, obj.name),
      );
    }
  }
}

async function copyDirectory() {
  try {
    const baseDirectory = path.join(__dirname + '\\project-dist\\assets');
    const src = path.join(__dirname, 'assets');
    await createFiles(baseDirectory, src);
  } catch (err) {
    console.log(err);
  }
}

const compileFiles = async () => {
  await rm(project, { recursive: true, force: true });
  await mkdir(project, { recursive: true });
  await createIndexHTML();
  await mergeStyles();
  await copyDirectory();
};

compileFiles();
