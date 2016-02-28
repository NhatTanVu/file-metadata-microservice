'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');
var SearchAPI = require(process.cwd() + '/app/controllers/api.imagesearch.js');

module.exports = function (app, db) {
   var clickHandler = new ClickHandler(db);
   var searchAPI = new SearchAPI(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

   app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);
      
   app.route('/api/imagesearch/:q')
      .get(searchAPI.searchImage);
   app.route('/api/latest/imagesearch')
      .get(searchAPI.getLatestSearchs);
};
