const jwt = require('jsonwebtoken');
require('dotenv').config();


const refreshJWTToken = (req, res, next) => {
    try {
        const authCookie = req.cookies.auth;
        if (!authCookie) {
            return res.sendStatus(401);
        }

        const refreshedToken = jwt.sign(
            { username: req.user },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            signed: true
        };
        console.log("token refreshed");
        res.cookie('auth', refreshedToken, cookieOptions);
        next();
    } catch (error) {
        console.error('Error refreshing JWT token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { refreshJWTToken };
  