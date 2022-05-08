const express = require('express');
const router = express.Router();
const eventTestController = require('../controllers/eventTestController.js');

// test rabbitmq events
router.get('/testStadtbus', eventTestController.sendTicketInquiry);

module.exports = router;
