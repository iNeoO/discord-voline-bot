const fs = require('fs');
const request = require('request');

module.exports = {
  download(uri, filename, callback) {
    request.head(uri, function() {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  },
};
