const amqp = require('../../lib/amqp');
const {ajv} = require('../validation'); // destructuring: call specific variable (including functions) exported from the required module

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

const routingKey = "private.kita"

exports.sendTicketInquiry = async (req, res) => {
            // schema validation
            const validate = ajv.getSchema('stadtbus_sendTicketInquiry')
            if (validate(req.body)) {
                await amqp.publish(routingKey, req.body)
            } else {
                // report error
                return res.status(400).send({error: true, msg: 'invalid ticket inquiry data'})
            }
         }
