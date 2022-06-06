const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController.js');

// GET all applications' data
router.get('/all', applicationsController.applicationsList);

// GET an application by id
router.get('/', applicationsController.getApplicationById);

// POST a new application
router.post('/', applicationsController.createApplication);

// UPDATE an existing application's data
router.patch('/', applicationsController.patchApplication);

// DELETE an existing application
router.delete('/', applicationsController.deleteApplication);

module.exports = router;
