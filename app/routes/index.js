'use strict';

var FileMetadataService = require(process.cwd() + '/app/controllers/fileMetadataService.js');

module.exports = function (app, upload) {
   var fileMetadataService = new FileMetadataService();

   app.route('/')
      .get(function (req, res, next) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

   app.route('/uploadFile')
      .post(upload.single('uploadedFile'), fileMetadataService.uploadFile);
};