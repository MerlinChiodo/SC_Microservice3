const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController.js');

// GET all images' data
router.get('/', imagesController.imagesList);

// GET an image by id
router.get('/:id', imagesController.getImageById);

// POST a new image
router.post('/post', imagesController.createImage);

// UPDATE an existing image's data
router.patch('/:id', imagesController.patchImage);

// DELETE an existing image
router.delete('/:id', imagesController.deleteImage);

module.exports = router;
