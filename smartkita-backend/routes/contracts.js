const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController.js');

// GET all contracts' data
router.get('/', contractsController.contractsList);

// GET a contract by id
router.get('/:id', contractsController.getContractById);

// POST a new contract
router.post('/post', contractsController.createContract);

// UPDATE an existing application's data
router.patch('/:id', contractsController.patchContract);

// DELETE an existing application
router.delete('/:id', contractsController.deleteContract);

module.exports = router;
