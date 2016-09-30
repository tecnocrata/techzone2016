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
    open.then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
        return ch.assertQueue(queueName).then(function (ok) {
            return ch.sendToQueue(queueName, new Buffer(message));
        });
    }).catch(console.warn);
}

exports.sendUnicastMessage = sendSimpleUnicastMessage;