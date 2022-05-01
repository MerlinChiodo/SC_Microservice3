var express = require('express');
var router = express.Router();
const kitasController = require('../controllers/kitasController.js');

// GET all kitas' data
router.get('/', kitasController.kitasList);

// GET a kita by id
router.get('/:id', kitasController.getKitaById);

module.exports = router;
