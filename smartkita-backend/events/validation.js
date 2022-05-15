const amqp = require('amqplib/callback_api');
const Ajv = require('ajv');

const schema_sendTicketInquiry = require('./stadtbus/sendTicketInquirySchema.json');
const schema_receiveRefugeeKitaApplication = require('./integration/receiveRefugeeKitaApplicationSchema.json');
const schema_sendCalendarEntry = require('./forum/sendCalendarEntrySchema.json');
const schema_sendNewsletterPost = require('./forum/sendNewsletterPostSchema.json')

// what's happening here?
const ajv = exports.ajv = new Ajv();

ajv.addSchema(schema_sendTicketInquiry, 'stadtbus_sendTicketInquiry');
ajv.addSchema(schema_receiveRefugeeKitaApplication, 'integration_receiveRefugeeKitaApplication');
ajv.addSchema(schema_sendCalendarEntry, 'forum_sendCalendarEntry');
ajv.addSchema(schema_sendNewsletterPost, 'forum_sendNewsletterPost');
