'use strict';

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');
var fs = require("fs");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/locations', function(req, res) {
  var locations = fs.readFileSync("./location.json");
  res.send(JSON.parse(locations).user1);
});

app.post('/locations', function(req, res) {
  var coords = req.body
  console.log(coords);

  fs.readFile('./location.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
      var obj = JSON.parse(data); //now it an object
      console.log(obj);
      obj.user1.push(coords); //add some data
      var json = JSON.stringify(obj); //convert it back to json
      fs.writeFileSync('./location.json', json, 'utf8'); // write it back
      res.send('success')
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
