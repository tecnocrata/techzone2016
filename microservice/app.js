var express = require('express');
var config = require('./config');
var path = require('path');
var bole   = require('bole');
var request = require('request');
var app = express();
var server = require('http').createServer(app);
var info = require('./controllers/info');
var sender = require('./lib/bus/publisher');
var receiver = require('./lib/bus/subscriber');
//var services = require('./services');

bole.output({level: "debug", stream: process.stdout});
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
var log = bole("server");

app.get('/', function (req, res) {
  res.send('Hello there !\n');
});

app.get('/send', function (req, res) {
  if (!req.query.message){
    res.status(401).send ('Message parameter required!');
    return;
  }
  sender.sendUnicastMessage('hello', req.query.message);
  res.status(200).end();
});

app.get('/sendbrowser', function (req, res) {
  if (!req.query.message){
    res.status(401).send ('Message parameter required!');
    return;
  }
  sender.sendStompMessage('image.upload', req.query.message);
  res.status(200).end();
});

/*app.get('/receive', function (req, res) {
  res.send('This page is receiving data\n');
  receiver.subscribeMessage('testexchange', '', function (message) {
    log.info('Received message: ' + message.data.toString('utf-8'));
  });
});*/

app.get('/info', function (req, res) {
  /*services.getMongoDbConnection(function(error, db) {
    var document = {name:"Alex", title:"About MongoDB"};
    db.collection('test').insert(document, function(err, records) {
      if (err) throw err;
      log.info("Record added");
    });
  });*/
  res.send(info.showInfo());
});

/*app.get('/data', function(req, res) {
  var username= 'cf-requestor';
  var password= 'GenEfbeeWrosFexofufupniwydHeur';
  var url= 'https://cip-cf-api.apps.dev.labs.cf.canopy-cloud.com/cf';
  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

  // setting insecure conneciton
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  request.post(
    {
      url : url,
      headers : {
        "Authorization" : auth
      }
    },function (error, response, body) {
      res.send(body); 
    });
});*/

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

receiver.listenSimpleQueue('hello', msg => {
  log.info('(Microservice) Processing message now ' + msg +' from Queue hello');
});

receiver.listenBroadcast ('ex.regards', msg =>{
  log.info('(Microservice) Processing message now ' + msg +' from exchange ex.regards');
})

module.exports = server;