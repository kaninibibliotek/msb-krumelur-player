var express = require('express');
var fs      = require('fs');

var krumelurer = [];

fs.readdir(__dirname + '/behaviors', function(err, files) {
  if (err) {
    console.log(err);
  } else {
    files.forEach(function(file) {
      fs.readFile(__dirname + '/behaviors/' + file, 'utf8', function(err, data) {
        if (err) {
          console.log(err);
        } else {
          krumelurer.push(JSON.parse(data));
        }
      });
    });
  }
});

function getRandomKrumelurer(amount) {
  var rk = [];

  for (var i = 0; i < amount && krumelurer.length > 0; i++) {
    rk.push(krumelurer[Math.floor(Math.random() * krumelurer.length)]);
  }

  return rk;
}

var app = express();

app.use(express.static(__dirname));

app.get('/krumelur/random/:amount', function(req, res) {
  var amount = parseInt(req.params.amount);

  console.log("GET krumelurer", amount);

  res.send(getRandomKrumelurer(amount));
});

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("Serving msb-krumelur-player at " + port);
});
