const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController.js');

// GET all children's data
router.get('/all', childrenController.childrenList);

// GET a child by id
router.get('/', childrenController.getChildById);

// POST a new child
router.post('/', childrenController.createChild);

// UPDATE an existing child's data
router.patch('/', childrenController.patchChild);

// DELETE an existing child
router.delete('/', childrenController.deleteChild);

module.exports = router;
