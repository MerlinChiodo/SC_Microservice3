const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController.js');

// GET all images' data
router.get('/all', imagesController.imagesList);

// GET an image by id
router.get('/', imagesController.getImageById);

// POST a new image
router.post('/', imagesController.createImage);

// UPDATE an existing image's data
router.patch('/', imagesController.patchImage);

// DELETE an existing image
router.delete('/', imagesController.deleteImage);

module.exports = router;
