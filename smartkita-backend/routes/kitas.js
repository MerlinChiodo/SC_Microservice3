const express = require('express');
const router = express.Router();
const kitasController = require('../controllers/kitasController.js');

// GET all kitas' data
router.get('/', kitasController.kitasList);

// GET a kita by id
router.get('/:id', kitasController.getKitaById);

// POST a new kita
router.post('/post', kitasController.createKita);

// UPDATE an existing kita's data
router.patch('/:id', kitasController.patchKita);

// DELETE an existing kita
router.delete('/:id', kitasController.deleteKita);

module.exports = router;
