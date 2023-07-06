const express = require('express');
const router = express.Router();
const {handleLoginUser} = require('../controllers/loginController');

router.post('/', handleLoginUser);

module.exports = router;