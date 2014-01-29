var express = require('express');
var http = require('http');
var path = require('path');

var publicDir = 'public';

var app = express();

app.configure(function() {
  app.set('port', 3344);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, publicDir)));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.render('index');
});

var server = http.createServer(app).listen(app.get('port'));

require('./socketStatic').init(server, publicDir);