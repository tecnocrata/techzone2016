'use strict'

var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');

/*// Publisher
open.then(function (conn) {
    return conn.createChannel();
}).then(function (ch) {
    return ch.assertQueue(q).then(function (ok) {
        return ch.sendToQueue(q, new Buffer('something to do'));
    });
}).catch(console.warn);*/


function sendSimpleUnicastMessage(queueName, message) {
    // Publisher
    let channel;
    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            channel = ch;
            return ch.assertQueue(queueName);
        })
        .then((ok, err) => {
            return channel.sendToQueue(queueName, new Buffer(message));
        })
        .catch(console.warn);
}

/*var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});*/

function sendBroadcastMessage(exchange, message) {

    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            //var ex = 'logs';
            //var msg = process.argv.slice(2).join(' ') || 'Hello World!';
            ch.assertExchange(exchange, 'fanout', { durable: false });
            ch.publish(exchange, '', new Buffer(message));
            console.log(" [x] Sent %s", message);
        });
}

exports.sendUnicastMessage = sendSimpleUnicastMessage;