var express = require('express');
var app = express();

var api_router = require('./api');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api', api_router);

app.use(function(req, res){
    // res.send(404); // deprecated
    res.status(404).send('<h1>404/Not found</h1>');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
