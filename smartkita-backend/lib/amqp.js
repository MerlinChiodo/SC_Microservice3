const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

const amqp = require('amqplib/callback_api.js')

 class RabbitMQWrapper {
    static #connectionString = `amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`;

    static async publish(routingKey, body) {
        console.log(body);
        console.log(`RabbitMQ: attempting to send event ${body.event_name}`);
        amqp.connect(RabbitMQWrapper.#connectionString, { keepAlive: true }, (connectError, connection) => {
            if (connectError) { throw connectError; }
            connection.createChannel((channelError, channel) => {
                if (channelError) { throw channelError; }
                channel.publish('events', routingKey, Buffer.from(JSON.stringify(body)));
                console.log(`RabbitMQ: sent event ${body.event_name}`);
            });
        });
    }
}

module.exports = RabbitMQWrapper;
