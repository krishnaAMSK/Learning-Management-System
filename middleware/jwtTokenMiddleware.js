const jwt = require('jsonwebtoken');
const {constants} = require('../constants');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authCookie = req.cookies.auth;
    if(!authCookie)
        return res.sendStatus(constants.UNAUTHORIZED);

    jwt.verify(
        authCookie,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err)
                return res.status(constants.FORBIDDEN).json({"message": "JWT Token error."});
            
            req.user = decoded.username;
            next();
        }
    )
};

module.exports  = verifyJWT;