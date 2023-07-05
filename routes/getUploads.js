const express = require('express');
const router = express.Router();

const getUploadedfiles = require('../controllers/getUploadedfiles');
router.get('/',getUploadedfiles.getFiles);

module.exports = router;