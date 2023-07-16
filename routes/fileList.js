const express = require('express');
const router = express.Router();

const fileController = require('../controllers/fileListController');
router.get('/', fileController.listFiles);

module.exports = router;