const fs = require('fs');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig);

const JWT_SECRET = 'your_secret_key';

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1y' });
}

const connectDB = async () => {
    try {
        const initializeDB = async () => {
            try {
                const client = await pool.connect();
                await client.query(`
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(255) UNIQUE NOT NULL,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `);
                console.log("Users table created or already exists");
                client.release();
            } catch (err) {
                console.error("Error creating users table:", err);
            }
        };
        
        initializeDB();
        
        const client = await pool.connect();
        const res = await client.query("SELECT VERSION()");
        console.log('PostgreSQL Version:', res.rows[0].version);
        client.release();
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
};

module.exports = { pool, generateToken, connectDB, JWT_SECRET };
