#!/usr/bin/env node

var exchange = 'ex.regards';
var message = 'My broadcast demo';
//var open = require('amqplib').connect('amqp://localhost');
var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');


/*open
  .then(function (conn) {
    return conn.createChannel();
  })
  .then(function (ch) {
    ch.assertQueue(q, { durable: true });
    return ch.assertQueue(q)
      .then(function (ok) {
        return ch.sendToQueue(q, new Buffer('something to do'));
      });
  })
  .catch(console.warn);*/


open
  .then(conn => {
    return conn.createChannel();
  })
  .then(ch => {

    ch.assertExchange(exchange, 'fanout', { durable: false });
    ch.publish(exchange, '', new Buffer(message));
    console.log(" [x] Sent %s", message);
  })
  .catch(console.warn);