var express = require('express');
const { pool, generateToken, JWT_SECRET } = require('../../../config/dbconnect');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../../middleware/auth');

router.get('/',authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                blogs.id,
                blogs.title,
                blogs.image_url,
                blogs.content,
                blogs.created_at,
                blogs.updated_at,
                users.username AS author
            FROM blogs
            JOIN users ON blogs.author_id = users.id
            ORDER BY blogs.created_at DESC
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error: Unable to fetch blogs' });
    }
});

module.exports = router;
