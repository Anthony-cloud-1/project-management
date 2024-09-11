/**
 * Authentication
 */

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('User authenticated:', req.user);
        next();
    } catch (err) {
        console.log('Invalid token');
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { auth };
