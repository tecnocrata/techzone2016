var express  = require('express');
var config   = require('./config');
var path     = require('path');
var app      = express();
var server   = require('http').createServer(app);
//var info     = require('./lib/controllers/info');
var sender   = require('./lib/bus/publisher');
var receiver = require('./lib/bus/subscriber');
//var services = require('./services');
var request = require('request');

var mongodb = require( 'mongodb' ); 
var MongoClient = mongodb.MongoClient;
var assert = require('assert');

app.get('/', function (req, res) {
  res.send('Hello there !\n');
});

app.get('/send', function (req, res) {
  res.send('This page is sending data\n');
  sender.publishMessage('testexchange', 'This is a test !', '');
});

app.get('/receive', function (req, res) {
  res.send('This page is receiving data\n');
  receiver.subscribeMessage('testexchange', '', function(message) {
    console.log('Received message: ' + message.data.toString('utf-8'));
  });
});

/*app.get('/info', function (req,res) {
  services.getMongoDbConnection(function(error, db) {
    var document = {name:"Alex", title:"About MongoDB"};
    db.collection('test').insert(document, function(err, records) {
      if (err) throw err;
      console.log("Record added");
    });
  });
  res.send(info.showInfo());
});*/

app.get('/data', function(req, res) {
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
});

app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

function startServer() {
  app.microserviceapp = server.listen(config.express.port, config.express.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.express.port, app.get('env'));
  });
}

setImmediate(startServer);

module.exports = server;