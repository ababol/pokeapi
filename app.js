var restful = require('node-restful'),
    mongoose = restful.mongoose,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    express = require('express'),
    http = require('http');

mongoose.connect('mongodb://localhost:27017/pokemon');

app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var pokemon = require('./app/routes/pokemon');
pokemon.define(app, '/api/v1');

var port = process.env.PORT || 3333;
http.createServer(app).listen(port, function() {
  console.log('Express server listening on port 3333');
});
