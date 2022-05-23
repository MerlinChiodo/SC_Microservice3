const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

// GET all applications' data
router.get('/', employeesController.employeesList);

// GET an application by id
router.get('/:id', employeesController.getEmployeeById);

// POST a new application
router.post('/post', employeesController.createEmployee);

// UPDATE an existing application's data
router.patch('/:id', employeesController.patchEmployee);

// DELETE an existing application
router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;
