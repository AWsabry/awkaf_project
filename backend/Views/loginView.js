const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../Models/UserModel.js');
const { STATIC_STRINGS } = require('../static/constants.ts');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.json({
            success: true,
            message: STATIC_STRINGS.AUTH.LOGIN_SUCCESS,
            status: 200,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
    try {
        // Logic for logout (e.g., clearing session or token)
        res.json({
            success: true,
            message: STATIC_STRINGS.AUTH.LOGOUT_SUCCESS,
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging out',
            error: error.message
        });
    }
});

module.exports = router;
