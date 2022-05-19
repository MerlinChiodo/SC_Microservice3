const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');

// GET all applications' data
router.get('/', documentsController.documentsList);

// GET an application by id
router.get('/:id', documentsController.getDocumentById);

// POST a new application
router.post('/post', documentsController.createDocument);

// UPDATE an existing application's data
router.patch('/:id', documentsController.patchDocument);

// DELETE an existing application
router.delete('/:id', documentsController.deleteDocument);

module.exports = router;
