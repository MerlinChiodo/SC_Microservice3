const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const multer  = require('multer')
const path = require('path')

// const upload = multer({ dest: 'uploads/', fileFilter: '' });

let upload = multer({
    errorHandling: 'manual',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/documents/'))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})

// GET all applications' data
router.get('/all', documentsController.documentsList);

// GET an application by id
router.get('/', documentsController.getDocumentById);

// POST a new application
router.post('/:id', upload.array('documents[]'), documentsController.createDocument);

// UPDATE an existing application's data
router.patch('/', documentsController.patchDocument);

// DELETE an existing application
router.delete('/', documentsController.deleteDocument);

module.exports = router;
