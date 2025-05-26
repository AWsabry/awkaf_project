const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');
const User = require('../Models/UserModel');
const auth = require('../middleware/auth');

router.use(bodyParser.json());

// Create a new user (Admin only)
router.post('/users', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const { username, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [sequelize.Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            role: role || 'user'
        });

        // Remove password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.SUCCESS,
            data: userResponse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

// Get all users (Admin only)
router.get('/users', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// Get user profile (Authenticated users)
router.get('/users/profile', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message
        });
    }
});

// Update user (Admin or self)
router.put('/users/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

        // Check if user is admin or updating their own profile
        if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only update your own profile.'
            });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Only admin can update role
        if (role && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only admin can update user role.'
            });
        }

        // Check if username or email is already taken
        if (username || email) {
            const existingUser = await User.findOne({
                where: {
                    [sequelize.Op.or]: [
                        username ? { username } : {},
                        email ? { email } : {}
                    ],
                    [sequelize.Op.not]: { id }
                }
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists'
                });
            }
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        if (role && req.user.role === 'admin') updateData.role = role;

        await user.update(updateData);

        // Remove password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.SUCCESS,
            data: userResponse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

// Delete user (Admin only)
router.delete('/users/:id', auth, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.destroy();

        res.json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
            status: 200
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

module.exports = router; 