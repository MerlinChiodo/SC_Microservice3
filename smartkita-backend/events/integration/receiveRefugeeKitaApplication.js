const amqp = require('amqplib/callback_api');
const {ajv} = require('../validation'); // destructuring: call specific variable (including functions) exported from the required module
const prisma = require('../../lib/prisma');

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

exports.receiveRefugeeKitaApplication = async(req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`, function (connectError, connection) {
        if (connectError) {
            throw connectError
        }
        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError
            }

            channel.consume('kita', function (msg) {
                console.log(msg.content.toString())
                let integrationInquiry = JSON.parse(msg.content.toString())

                // schema validation
                const validate = ajv.getSchema('integration_receiveRefugeeKitaApplication')

                if (validate(req.body)) {
                    try {
                        console.log(integrationInquiry)
                        // TODO: validate data, write integration application to database (high priority etc., see specification)
                    } catch (e) {
                        return console.log(e)
                    }
                } else {
                    // report error
                    return res.status(400).send({error: true, msg: 'invalid ticket inquiry data'})
                }
            }, {
                noAck: true,
            })
        })
    })
}
