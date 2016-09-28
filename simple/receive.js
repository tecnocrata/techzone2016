#!/usr/bin/env node
//https://github.com/squaremo/amqp.node
var q = 'hello';
var amqp = require('amqplib/callback_api');

/*amqp.connect('amqp://abx-admin:abx01@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    ch.assertQueue(q, {durable: true});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});*/

var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);