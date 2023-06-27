const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authCookie = req.cookies.auth;
    if(!authCookie)
        return res.sendStatus(401);

    jwt.verify(
        authCookie,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err)
                return res.status(403).json({"message": "JWT Token error."});
            
            req.user = decoded.username;
            next();
        }
    )
};

module.exports  = verifyJWT;