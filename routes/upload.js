const express = require('express');
const router = express.Router();
const upload = require('../config/mutler.config');
const handleUpload = require('../controllers/uploadController');

router.post('/', upload.single('files'), handleUpload.fileUpload);
router.get('/', handleUpload.showUploadPage);

module.exports = router;