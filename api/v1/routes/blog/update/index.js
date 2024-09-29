var express = require('express');
const { pool, generateToken, JWT_SECRET } = require('../../../config/dbconnect');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../../middleware/auth');

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, image_url, content } = req.body;
    const author_id = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = await pool.query(
            `UPDATE blogs 
             SET title = $1, image_url = $2, content = $3, updated_at = NOW() 
             WHERE id = $4 AND author_id = $5 
             RETURNING *`,
            [title, image_url, content, id, author_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found or not authorized to update' });
        }

        return res.status(200).json({
            message: 'Blog updated successfully',
            blog: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error: Unable to update blog' });
    }
});

module.exports = router;
