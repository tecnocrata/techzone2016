var open = require('amqplib').connect('amqp://abx-admin:abx01@localhost');
/*open.then(function(conn) {
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
}).catch(console.warn);*/

//I think listeners/subscribers should have a separate connection, I will test as is
//If found problems I will share one connection and create separate channels
function setupSimpleQueue(queueName, workerProcess) {
    open.then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
        return ch.assertQueue(queueName).then(function (ok) {
            return ch.consume(queueName, function (msg) {
                if (msg !== null) {
                    //console.log(msg.content.toString());
                    console.log ('Starting to process message...'+msg);
                    workerProcess (msg);
                    ch.ack(msg);
                }
            });
        });
    }).catch(console.warn);
}

exports.listenSimpleQueue = setupSimpleQueue;