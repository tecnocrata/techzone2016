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

exports.sendUnicastMessage = sendSimpleUnicastMessage;