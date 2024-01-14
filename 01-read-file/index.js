const fs = require('fs');
const path = require('path');
const process = require('process');
const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

if (stream) {
  stream.on('readable', function () {
    let chunk = stream.read();
    if (chunk !== null) process.stdout.write(chunk.toString());
  });
}
