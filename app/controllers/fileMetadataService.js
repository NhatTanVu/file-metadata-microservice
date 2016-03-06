'use strict';

var uuid = require('node-uuid');

function fileMetadataService () {
   this.uploadFile = function (req, res, next) {
      var file = req.file;
      
      if(!file) {
         res.sendStatus(400);
         return;
      }
      
      var sessionId = uuid.v4();
      var result = {
         fileName: file.originalname,
         fileSize: file.size
      };
      
      console.log("uploadFile[" + sessionId + "] - file name = " + result.fileName + ", file size = " + result.fileSize);
      
      res.json(result);
   };
}

module.exports = fileMetadataService;