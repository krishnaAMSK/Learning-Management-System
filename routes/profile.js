const express = require('express');
const router = express.Router();
const profile = require('../controllers/profileController');

router.get('/:userId', profile.getProfile);
router.post('/:userId', profile.updateProfile);

module.exports = router;