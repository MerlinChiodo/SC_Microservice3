const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

exports.sendTicketInquiry = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`, function(connectError, connection){
    //     amqp.connect('amqp://' + rabbitMQUsername + ':' + rabbitMQPassword + '@' + rabbitMQserverURL, function(connectError, connection){
    // amqp.connect('amqp://guest:guest@localhost:5672', function(connectError, connection){
        if (connectError) {
            throw connectError
        }
        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError
            }
            // insert schema validation here

            channel.publish('events', "public.kita", Buffer.from(JSON.stringify((req.body))))
            console.log('RabbitMQ: sent event ${req.body}')

            })
        })
    }
