const https = require('https');
const fs = require('fs');

module.exports = function download(url, dest, file, callback) {
  const request = https.get(url, function(response) {
    const {
      statusCode,
      headers,
    } = response;

    if (statusCode >= 300 && statusCode < 400 && headers.location) {
      const location = headers.location;
      download(location, dest, file, callback);

    } else {
      checkDir(dest,function(err){
        if (err) { return callback(err); }

        const fileStream = fs.createWriteStream(dest+'/'+file);
        response.pipe(fileStream);
        fileStream.on('finish', callback).on('error', callback);
      });
    }
  });
  request.on('error', callback);
};

function checkDir(path, callback) {
  fs.stat(path, function(err, stat) {
    if (err) {
      return fs.mkdir(path, '777', callback);
    }
    callback(null);
  });
}
