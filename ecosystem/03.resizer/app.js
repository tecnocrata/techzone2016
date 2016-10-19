var express = require('express');
var config = require('./config');
var path = require('path');
var bole = require('bole');
var request = require('request');
var app = express();
var server = require('http').createServer(app);
var info = require('./controllers/info');
var sender = require('./lib/bus/publisher');
var receiver = require('./lib/bus/subscriber');
var repository = require('./lib/dbrepository');
var timer = require('./lib/time.util');

bole.output({ level: "debug", stream: process.stdout });
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
var log = bole("server");

app.get('/', function (req, res) {
  res.send('Hello there !\n');
});

app.get('/send', function (req, res) {
  if (!req.query.message) {
    res.status(401).send('Message parameter required!');
    return;
  }
  sender.sendUnicastMessage('hello', req.query.message);
  res.status(200).end();
});

app.get('/sendbrowser', function (req, res) {
  if (!req.query.message) {
    res.status(401).send('Message parameter required!');
    return;
  }
  sender.sendStompMessage('image.upload', req.query.message); //TODO what about image.upload/refresh
  res.status(200).end();
});

app.get('/info', function (req, res) {
  res.send(info.showInfo());
});

app.use(function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

function startServer() {
  app.microserviceapp = server.listen(config.express.port, config.express.ip, function () {
    log.info('Express server listening on %d, in %s mode', config.express.port, app.get('env'));
  });
}

setImmediate(startServer);

/*receiver.listenSimpleQueue('hello', msg => {
  log.info('(Microservice) Processing message now ' + msg +' from Queue hello');
});*/

let id;
receiver.listenBroadcast('image.uploaded', msg => {
  log.info('(Notifier - Microservice)   Processing message now ...' + msg + ' from exchange image.uploaded');
  id = msg;

  timer.sleep(1000, () => {
    console.log('Image resized ' + id);
    return repository.updateData(id);
  })
    .then(item => {
      console.log('Sending event to browser...');
      console.log (item.value);
      sender.sendStompMessage('image.resized', JSON.stringify(item.value));
    })
    .catch(err => {
      console.log('Unexpected error...' + err);
    });
})


module.exports = server;