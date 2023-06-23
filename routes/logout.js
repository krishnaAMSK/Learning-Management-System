const express = require('express');
const router = express.Router();

const handleLogout = require('../controllers/logoutController');
router.get('/', handleLogout.handleLogoutUser);

module.exports = router;