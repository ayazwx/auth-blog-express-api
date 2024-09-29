var express = require('express');
const { pool, generateToken, JWT_SECRET } = require('../../../config/dbconnect');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/',authenticateToken, upload.single('photo'), async (req, res) => {
    const { title, content } = req.body;
    const author_id = req.user.id;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const photoUrl = req.file ? `/static/uploads/${req.file.filename}` : null;

    try {
        const result = await pool.query(
            `INSERT INTO blogs (title, image_url, content, author_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, photoUrl, content, author_id]
        );

        return res.status(201).json({
            message: 'Blog created successfully',
            blog: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error: Unable to create blog' });
    }
});


module.exports = router;
