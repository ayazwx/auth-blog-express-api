var express = require('express');
const { pool, generateToken, JWT_SECRET } = require('../../config/dbconnect');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log(jwt.verify(token, JWT_SECRET))
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: `Welcome ${decoded.username}` });
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});


module.exports = router;
