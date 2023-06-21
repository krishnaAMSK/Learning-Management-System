const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
