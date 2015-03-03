var https = require('https');
var fs = require('fs');
module.exports = function download(url, dest, file, callback) {
  var request = https.get(url, function(response) {
    checkDir(dest,function(err){
      if (err) { return callback(err); }

      var fileStream = fs.createWriteStream(dest+'/'+file);
      response.pipe(fileStream);
      fileStream.on('finish', callback).on('error', callback);
    });
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
