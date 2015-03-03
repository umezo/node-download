var fs = require('fs');
var download = require('../node-download');
var expect = require('expect.js');
describe('node-download',function(){
  var url = 'https://github.com/umezo/node-download';
  var storedFileName = 'node-download.html';
  var storedPath = __dirname;
  beforeEach(function(done){
    fs.unlink(storedPath+'/'+storedFileName,function(err){
      done();
    });
  });
  after(function(done){
    fs.unlink(storedPath+'/'+storedFileName,function(err){
      done();
    });
  });
  it('download',function(done){
    download(url,storedPath,storedFileName,function(err){
      fs.stat(storedPath+'/'+storedFileName, function(err, stat) {
        expect(err).to.be(null);
        done();
      }); 
    });
  });
});
