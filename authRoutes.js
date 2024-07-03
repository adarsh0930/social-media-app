const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const validator = require('validator')


function cleanExpiredTokens(tokens) {
    const now = new Date();
    return tokens.filter(token => new Date(token.expires_at) > now);
}


router.post('/signup', (req, res) => {
    const { username, email, phone, password} = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }


    if (!validator.isMobilePhone(String(phone))) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }
    

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is weak' });
    }


    bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const userQuery = `
            INSERT INTO users (username, email, phone, password)
            VALUES (?, ?, ?, ?)
        `;
        db.run(userQuery, [username, email, phone, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
                res.json({ message: 'User registered successfully' });
        });
    });
});



router.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    const query = `
        SELECT * FROM users
        WHERE (username = ? OR email = ? OR phone = ?)
    `;
    db.get(query, [identifier, identifier, identifier], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!result) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);

            let tokens = JSON.parse(user.tokens || '[]');
            tokens = cleanExpiredTokens(tokens);
            tokens.push({ token, expires_at: expiresAt });

            const updateQuery = `
                UPDATE users
                SET tokens = ?
                WHERE id = ?
            `;
            db.run(updateQuery, [JSON.stringify(tokens), user.id], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Login successful', token });
            });
        });
    });
});

module.exports = router
