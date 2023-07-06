const express = require('express');
const router = express.Router();

const uploadingfile = require('../controllers/uploadingfile');
router.post('/', uploadingfile.upload);

module.exports = router;