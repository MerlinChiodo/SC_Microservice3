const amqp = require('amqplib/callback_api');
const {ajv} = require('../validation'); // destructuring: call specific variable (including functions) exported from the required module
const prisma = require('../../lib/prisma');

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const rabbitMQserverURL = process.env.rabbitMQserverURL

    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${rabbitMQserverURL}`, function (connectError, connection) {
        if (connectError) {
            throw connectError
        }
        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError
            }

            /* {"event_id":9002,"event_name":"Refugee Kita Application","service_name":"integration","care_time":30,"child":{"citizen_id":20 },"parent":{"citizen_id":20}} */

            channel.consume('kita', async function (msg) {
                let integrationInquiry = JSON.parse(msg.content.toString())
                console.log(integrationInquiry)

                // schema validation
                const validate = ajv.getSchema('integration_receiveRefugeeKitaApplication')

                if (validate(integrationInquiry)) {
                    console.log("integration inquiry validated")

                    const id_einrichtung = undefined;
                    const status = "Eingegangen"
                    const prioritaet = 3
                    const bemerkung = "Amt für Integration"
                    const datum = new Date()
                    const id_kind = integrationInquiry.child.citizen_id
                    const id_ezb = integrationInquiry.parent.citizen_id
                    const betreuungsstunden = integrationInquiry.care_time

                    // PRISMA write
                    try {
                        const Antrag = await prisma.antrag.create({
                            data: {
                                id_einrichtung,
                                status,
                                prioritaet,
                                bemerkung,
                                datum,
                                id_kind,
                                id_ezb,
                                betreuungsstunden
                            }
                        })
                        console.log("PRISMA write success")
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    // report error
                    console.log("integration inquiry failed to validate")
                    console.log(integrationInquiry)
                    // return res.status(400).send({error: true, msg: 'invalid ticket inquiry data'})
                }
            }, {
                noAck: true,
            })
        })
    })

