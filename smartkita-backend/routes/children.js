const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController.js');

// GET all children's data
router.get('/', childrenController.childrenList);

// GET a child by id
router.get('/:id', childrenController.getChildById);

// POST a new child
router.post('/post', childrenController.createChild);

// UPDATE an existing child's data
router.patch('/:id', childrenController.patchChild);

// DELETE an existing child
router.delete('/:id', childrenController.deleteChild);

module.exports = router;
