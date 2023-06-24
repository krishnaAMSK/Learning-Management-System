const express = require('express');
const router = express.Router();

const emailVerification = require('../controllers/emailVerification');
router.get('/',emailVerification.verifyMail);

module.exports = router;