const amqp = require('amqplib/callback_api');
const Ajv = require('ajv');

const schema_stadtbus_event = require('./stadtbus/stadtbus_eventSchema.json');

// what's happening here?
const ajv = exports.ajv = new Ajv();

ajv.addSchema(schema_stadtbus_event, 'stadtbus_event');
