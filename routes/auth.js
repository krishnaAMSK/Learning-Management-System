const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const {signUpValidation}=require('../helpers/validation');
const mysql = require('mysql');
// const handleLogin = require('../controllers/loginController');
// const handleLogout = require('../controllers/logoutController');
// const refreshToken = require('../controllers/refreshTokenController');
// const resetPassword = require('../controllers/passwordResetController');
const userController = require('../controllers/emailVerification');

// router.get('/login', handleLogin);
// router.post('/login', handleLogin);
// router.get('/logout', handleLogout);
// router.get('/refresh', refreshToken);
// router.get('/register', registerUser);
router.post('/register',signUpValidation,userController.register);
// router.post('/register', registerUser);
// router.post('/reset', resetPassword);
// router.post('verifyMail', verifyMail);



module.exports = router;







