// routes/user.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const router = express.Router();
const prisma = new PrismaClient();

// Default GET Route for `/api/user`
router.get('/', (req, res) => {
    console.log('GET request received at /api/user');
    res.send('Welcome to the User API! Use POST /api/user/register to register a new user.');
});

// User Registration Route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log('POST /register called');
    console.log('Request body:', req.body);

    if (!email || !password) {
        console.log('Validation failed: Missing email or password');
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        console.log('User created successfully:', newUser);
        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            createdAt: newUser.createdAt,
        });
    } catch (error) {
        console.error('Error during registration:', error); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});

module.exports = router;
