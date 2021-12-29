const fs = require('fs');
const path = require('path');

class CacheHandler {
  path;

  constructor() {
    this.path = path.join(__dirname, '..', 'resources', 'cache.txt');
  }

  loadApplicationFromCache() {
    try {
      return fs.readFileSync(this.path, 'utf-8', (err, file) => {
        if (err) return new Error('File read failed: ' + err);
        return file;
      });
    } catch(err) {
      console.log('Failed reading file.', err);
      throw new Error(err);
    }
  }

  saveApplicationToCache(item) {
    try {
      fs.writeFile(this.path, item, err => {return new Error('Failed to write file: ' + err)});
    } catch (err) {
      console.log('Failed saving file.', err);
      throw new Error(err);
    }
  }
}

module.exports = CacheHandler;
