/* jshint node: true */
'use strict';

var config = require('./config.json');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/manifest.webapp', function(req, res) {
  res.sendFile(__dirname + '/manifest.webapp');
});

app.use('/vendor', express.static('vendor'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

var server = app.listen(config.server_port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

