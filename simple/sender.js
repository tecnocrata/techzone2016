#!/usr/bin/env node

var q = 'hello';
//amqp://abx-admin:abx01@host.com/vhost
var amqp = require('amqplib/callback_api');
//var open = require('amqplib').connect('amqp://localhost');
var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');

/*amqp.connect('amqp://abx-admin:abx01@localhost/', function(err, conn) {
  console.log ('conn value '+conn);
  conn.createChannel(function(err, ch) {
    
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: true});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});*/

open
  .then(function (conn) {
    return conn.createChannel();
  })
  .then(function (ch) {
    ch.assertQueue(q, { durable: true });
    return ch.assertQueue(q)
      .then(function (ok) {
        return ch.sendToQueue(q, new Buffer('something to do'));
      });
  }).catch(console.warn);