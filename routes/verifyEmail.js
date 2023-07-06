const express = require('express');
const router = express.Router();
const {verifyMail, sendMail, emailContent} = require('../controllers/emailVerification');

router.get('/',verifyMail);

module.exports = router;