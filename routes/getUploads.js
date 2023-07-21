const express = require('express');
const router = express.Router();

const getUploadedfiles = require('../controllers/getUploadedfiles');
router.get('/:userId',getUploadedfiles.getFiles);

module.exports = router;