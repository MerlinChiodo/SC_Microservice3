const express = require('express');
const router = express.Router();
const kitasController = require('../controllers/kitasController.js');

// GET all kitas' data
router.get('/all', kitasController.kitasList);

// GET a kita by id
router.get('/', kitasController.getKitaById);

// POST a new kita
router.post('/', kitasController.createKita);

// UPDATE an existing kita's data
router.patch('/', kitasController.patchKita);

// DELETE an existing kita
router.delete('/', kitasController.deleteKita);

module.exports = router;
