const amqp = require('amqplib/callback_api');
const {ajv} = require('../validation'); // destructuring: call specific variable (including functions) exported from the required module

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

exports.sendTicketInquiry = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`, function(connectError, connection){
        if (connectError) {
            throw connectError
        }
        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError
            }

            // schema validation
            const validate = ajv.getSchema('landingpage_sendChangeAboutUs')
            if (validate(req.body)) {

                channel.publish('events', "private.kita", Buffer.from(JSON.stringify((req.body))))
                console.log(`RabbitMQ: sent event ${req.body.event_id}`)
                return res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                // report error
                return res.status(400).send({error: true, msg: 'invalid about us data'})
            }
        })
    })
}
