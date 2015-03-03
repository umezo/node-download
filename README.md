# node-download
utility for file down loading


# Usage
```javascript
var download = require('node-download');
download(url,destDir,filename,function(err){
  if (err) {
    // error handling
    return;
  }

  // download completed
});
```
