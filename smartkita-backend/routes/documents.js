const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');

// GET all applications' data
router.get('/all', documentsController.documentsList);

// GET an application by id
router.get('/', documentsController.getDocumentById);

// POST a new application
router.post('/', documentsController.createDocument);

// UPDATE an existing application's data
router.patch('/', documentsController.patchDocument);

// DELETE an existing application
router.delete('/', documentsController.deleteDocument);

module.exports = router;
