const express = require('express');
const router = express.Router();

const forum_sendCalendarEntry = require('../events/forum/sendCalendarEntry');
const forum_sendNewsletterPost = require('../events/forum/sendNewsletterPost');
const landingpage_sendChangeAboutUs = require('../events/landingpage/sendChangeAboutUs');
const stadtbus_sendTicketInquiry = require('../events/stadtbus/sendTicketInquiry');

router.post(`/forum/calendarentry`, forum_sendCalendarEntry.sendCalendarEntry);
router.post(`/forum/newsletterpost`, forum_sendNewsletterPost.sendNewsletterPost);

router.post(`/landingpage/aboutus`, landingpage_sendChangeAboutUs.sendChangeAboutUs);

router.post(`/stadtbus/ticketinquiry`, stadtbus_sendTicketInquiry.sendTicketInquiry);

module.exports = router;
