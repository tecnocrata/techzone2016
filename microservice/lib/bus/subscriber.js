'use strict'

var util = require('util');
var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');
//var open = require('amqplib').connect('amqp://guest:guest@localhost');

//I think listeners/subscribers should have a separate connection, I will test as is
//If found problems I will share one connection and create separate channels
function setupSimpleQueue(queueName, workerProcess) {
    let channel;
    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(function (ch) {
            channel = ch;
            return ch.assertQueue(queueName);
        })
        .then((ok, err) => {
            return channel.consume(queueName, function (msg) {
                if (msg !== null) {
                    //console.log(msg.content.toString());
                    console.log('Starting to process Queue message... --> ' + util.inspect(msg.content.toString(), { showHidden: false, depth: null }));
                    workerProcess(msg.content.toString());
                    channel.ack(msg);
                }
            });
        })
        .catch(console.warn);
}

/*var amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            var ex = 'logs';

            ch.assertExchange(ex, 'fanout', { durable: false });

            ch.assertQueue('', { exclusive: true }, function (err, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                ch.bindQueue(q.queue, ex, '');

                ch.consume(q.queue, function (msg) {
                    console.log(" [x] %s", msg.content.toString());
                }, { noAck: true });
            });
        });
    });*/

function setupSubscriber(exchange, workerProcess) {
    let channel;
    //let ex = 'logs';
    open
        .then(conn => {
            return conn.createChannel();
        })
        .then(ch => {
            channel = ch;
            ch.assertExchange(exchange, 'fanout', { durable: false });
            return ch.assertQueue('', { exclusive: true });
        })
        .then(q => {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function (msg) {
                if (!msg) {
                    console.log("There is no message to process");
                }
                workerProcess(msg.content.toString());
            }, { noAck: true });
        });
}


exports.listenSimpleQueue = setupSimpleQueue;
exports.listenBroadcast = setupSubscriber;