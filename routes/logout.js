const express = require('express');
const router = express.Router();
const {handleLogoutUser} = require('../controllers/logoutController');

router.get('/', handleLogoutUser);

module.exports = router;