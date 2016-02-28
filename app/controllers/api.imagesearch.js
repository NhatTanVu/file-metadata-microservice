'use strict';

var request = require('request');
var uuid = require('node-uuid');

function imageSearchAPI (db) {
   var searchQuery = db.collection('searchQuery');
   var baseURL = "https://www.googleapis.com/customsearch/v1";

   this.searchImage = function (req, res) {
      var offset = parseInt(req.query.offset) ? parseInt(req.query.offset) : 1;
      var query = req.params.q;
      
      if(!query) {
         res.sendStatus(400);
         return;
      }
      
      var params = {
        q: query, // search text
        num: 10, // integer value range between 1 to 10 including
        start: offset, // integer value range between 1 to 101, it is like the offset
        imgSize: "medium", // for image size
        searchType: "image", // compulsory 
        fileType: "jpg", // you can leave these if extension does not matters you
        key: "AIzaSyDcp_V_7ewN66THJUiAyWXhwDhFs90rRf8", // API_KEY got from https://console.developers.google.com/
        cx: "012995232294902877286:o3sfaoppqrk", // cx value is the custom search engine value got from https://cse.google.com/cse(if not created then create it).
      };
      
      var sessionId = uuid.v4();
      console.log("searchImage[" + sessionId + "] - query = " + query + ", offset = " + offset);
      var searchDoc = {
         _id: sessionId,
         term: query,
         when: new Date(),
         success: false
      };
      
      request(
         { 
            method: 'GET', 
            uri: baseURL,
            qs: params
         }, 
         function (error, response, body) {
            var success = false;
            var returnedJSON = [];
            
            if (error)
               console.log("searchImage[" + sessionId + "] - query got error: " + error);
            else {
               if (response.statusCode == 200) {
                  console.log("searchImage[" + sessionId + "] - query successfully");
                  
                  var bodyObject = JSON.parse(body);
                  for (var i = 0; i < bodyObject.items.length; i++) {
                     returnedJSON.push({
                        url: bodyObject.items[i].link,
                        snippet: bodyObject.items[i].snippet,
                        thumbnail: bodyObject.items[i].image.thumbnailLink,
                        context: bodyObject.items[i].image.contextLink
                     });
                  }
                  
                  success = true;
               } else {
                  console.log("searchImage[" + sessionId + "] - query got error statusCode: " + response.statusCode + ", body: " + body);
               }
            }
            
            searchDoc.success = success;
            searchQuery.insertOne(searchDoc, function(err, result) {
               if (err) {
                  console.log("searchImage[" + sessionId + "] - save to DB got error: " + error);
                  res.sendStatus(500);
               }
               else {
                  if (searchDoc.success === true) {
                     console.log("searchImage[" + sessionId + "] - save to DB successfully");
                     res.json(returnedJSON);
                  }
                  else {
                     console.log("searchImage[" + sessionId + "] - save to DB got error");
                     res.sendStatus(500);
                  }
               }
            });
         } 
      );
   };

   this.getLatestSearchs = function (req, res) {
      var sessionId = uuid.v4();

      searchQuery.find().sort({ when: -1 }).limit(10).project({ term: 1, when: 1, _id: 0 }).toArray(function(err, documents) {
         if (err) {
            res.sendStatus(500);
            console.log("getLatestSearchs[" + sessionId + "] - err: " + err);
         }
   
         res.json(documents);
         console.log("getLatestSearchs[" + sessionId + "] - success");
      });
   };
}

module.exports = imageSearchAPI;
