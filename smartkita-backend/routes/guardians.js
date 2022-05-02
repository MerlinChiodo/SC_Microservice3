const express = require('express');
const router = express.Router();
const guardiansController = require('../controllers/guardiansController.js');

// GET all guardians' data
router.get('/', guardiansController.guardiansList);

// GET a guardian by id
router.get('/:id', guardiansController.getGuardianById);

// POST a new guardian
router.post('/post', guardiansController.createGuardian);

// UPDATE an existing guardian's data
router.patch('/:id', guardiansController.patchGuardian);

// DELETE an existing guardian
router.delete('/:id', guardiansController.deleteGuardian);

module.exports = router;
