const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for role-based access control
const checkRole = (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        const userRole = decoded.userRole;
        if (requiredRole.includes(userRole)) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
        }
    });
};

module.exports = checkRole;