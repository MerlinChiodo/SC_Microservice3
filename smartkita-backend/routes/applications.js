const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController.js');

// GET all applications' data
router.get('/', applicationsController.applicationsList);

// GET an application by id
router.get('/:id', applicationsController.getApplicationById);

// POST a new application
router.post('/post', applicationsController.createApplication);

// UPDATE an existing application's data
router.patch('/:id', applicationsController.patchApplication);

// DELETE an existing application
router.delete('/:id', applicationsController.deleteApplication);

module.exports = router;
