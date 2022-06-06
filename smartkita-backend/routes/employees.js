const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

// GET all applications' data
router.get('/all', employeesController.employeesList);

// GET an application by id
router.get('/', employeesController.getEmployeeById);

// POST a new application
router.post('/', employeesController.createEmployee);

// UPDATE an existing application's data
router.patch('/', employeesController.patchEmployee);

// DELETE an existing application
router.delete('/', employeesController.deleteEmployee);

module.exports = router;
