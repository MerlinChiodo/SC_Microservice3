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
            cb(null, req.params.id.toString() + "_" + file.originalname);
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

// GET all documents' data
router.get('/all', documentsController.documentsList);

// GET one citizen's documents' data
router.get('/allById', documentsController.documentsListById);

// GET a document by id
router.get('/', documentsController.getDocumentById);

// GET a document by Smartcity Id
router.get('/byScId', documentsController.getDocumentByScId);

// POST a new document
router.post('/:id', upload.array('document'), documentsController.createDocument);

// UPDATE an existing documents's data
router.patch('/', documentsController.patchDocument);

// DELETE an existing document
router.delete('/', documentsController.deleteDocument);

module.exports = router;
