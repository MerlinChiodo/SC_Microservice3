const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController.js');
const multer  = require('multer')
const path = require('path')

let upload = multer({
    errorHandling: 'manual',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/images/'))
        },
        filename: (req, file, cb) => {
            cb(null, req.params.id.toString() + "_" + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})

// GET all images' data
router.get('/all', imagesController.imagesList);

// GET one Kita's images' data
router.get('/allById', imagesController.imagesListById);

// GET an image by id
router.get('/', imagesController.getImageById);

// POST a new image
router.post('/:id', upload.array('image'), imagesController.createImage);

// UPDATE an existing image's data
router.patch('/', imagesController.patchImage);

// DELETE an existing image
router.delete('/', imagesController.deleteImage);

module.exports = router;
