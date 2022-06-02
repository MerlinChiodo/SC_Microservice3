const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`, { keepAlive: true }, function(connectError, connection) {
    if (connectError) {
        throw connectError
    }
    console.log("AMQP connected successfully")
})

module.exports = amqp;
