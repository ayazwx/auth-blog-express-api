const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/dbconnect');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) return res.status(401).json({ error: 'Unauthorized access' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
