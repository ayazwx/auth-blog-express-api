var express = require('express');
const { pool, generateToken } = require('../../config/dbconnect');
const router = express.Router();
const bcrypt = require('bcrypt');

// Route for registering a user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const token = generateToken(newUser.rows[0]);

        res.status(201).json({ message: 'User registered', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
