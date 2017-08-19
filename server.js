// server.js

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", function (request, response) {
  var date = request.params.date;
  var dateObject = {};
  if (isNaN(date)) {
    date = moment(date);
    dateObject.unix = parseInt(date.format('X'));
    dateObject.natural = date.format('MMMM Do, YYYY');
    if (dateObject.natural == "Invalid date") {
      dateObject.natural = date;
    }
  } else {
    dateObject.unix = date;
    dateObject.natural = moment.unix(date).format('MMMM Do, YYYY');
  }
  response.send(dateObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
