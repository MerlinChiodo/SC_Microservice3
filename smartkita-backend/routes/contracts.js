const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController.js');

// GET all contracts' data
router.get('/all', contractsController.contractsList);

// GET a contract by id
router.get('/', contractsController.getContractById);

// GET all contracts by userId
router.get('/all/byInternalId', contractsController.contractsListByInternalId)

// POST a new contract
router.post('/', contractsController.createContract);

// UPDATE an existing application's data
router.patch('/', contractsController.patchContract);

// DELETE an existing application
router.delete('/', contractsController.deleteContract);

module.exports = router;
