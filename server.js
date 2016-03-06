'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });
var upload = multer();

var app = express();

require('dotenv').config();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app, upload);

var port = process.env.PORT || 8080;
app.listen(port, function () {
   console.log('Node.js listening on port ' + port + '...');
});