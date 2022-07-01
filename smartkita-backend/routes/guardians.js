const express = require('express');
const router = express.Router();
const guardiansController = require('../controllers/guardiansController.js');

// GET all guardians' data
router.get('/all', guardiansController.guardiansList);

// GET a guardian by id
router.get('/', guardiansController.getGuardianById);

// GET a guardian by smartcity_id
router.get('/byScId', guardiansController.getGuardianBySmartcityId);

// POST a new guardian
router.post('/', guardiansController.createGuardian);

// UPDATE an existing guardian's data
router.patch('/', guardiansController.patchGuardian);

// DELETE an existing guardian
router.delete('/', guardiansController.deleteGuardian);

module.exports = router;
