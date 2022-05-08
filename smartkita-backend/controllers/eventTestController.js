const rabbitmq = require('../events/stadtbus/sendTicketInquiry')

exports.sendTicketInquiry = async (req, res) => {
    await rabbitmq.sendTicketInquiry(req, res);
    return res;

}
