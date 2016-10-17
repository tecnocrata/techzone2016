'use strict'
var config  = require('../../config/environment');
var open = require('amqplib').connect(config.rabbitmqURL);
//var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');
//var open = require('amqplib').connect('amqp://guest:guest@localhost');


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

function sendBroadcastMessage(exchange, message) {

    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            //var ex = 'logs';
            //var msg = process.argv.slice(2).join(' ') || 'Hello World!';
            console.log ('Trying to publish this message: '+message);
            ch.assertExchange(exchange, 'fanout', { durable: false });
            ch.publish(exchange, '', new Buffer(message.toString()));
            console.log(" [x] Broadcast Sent %s", message);
        });
}

function sendStompMessage (route, message){
    let exchange = 'amq.topic';
    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            ch.assertExchange(exchange, 'topic', { durable: true });
            //ch.publish(exchange, route, new Buffer(message), {contentType: "text/plain", deliveryMode: 2});
            ch.publish(exchange, route, new Buffer(message));
            console.log(" [x] Stomp Message Sent: %s", message);
        });
}

exports.sendUnicastMessage = sendSimpleUnicastMessage;
exports.sendBroadcastMessage = sendBroadcastMessage;
exports.sendStompMessage = sendStompMessage;