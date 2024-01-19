const fs = require('fs');
const path = require('path');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
process.stdout.write('Have a nice day! Please enter anything...\n');

process.stdin.on('data', (data) => {
  if (data.toString().trim() !== 'exit') {
    stream.write(data);
  } else {
    sayBye();
  }
});

stream.on('SIDINT', () => sayBye);

function sayBye() {
  process.stdout.write('\nBye!\n');
  process.exit();
}
