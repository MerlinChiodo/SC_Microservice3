const rabbitmq = require('../events/stadtbus/stadtbus_event')

exports.sendTicketInquiry = async (req, res) => {
    await rabbitmq.sendTicketInquiry(req, res);
    return res;

}
