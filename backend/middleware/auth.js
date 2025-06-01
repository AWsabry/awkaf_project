const jwt = require('jsonwebtoken');
const { STATIC_STRINGS } = require('../static/constants.ts');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid authentication token, access denied'
        });
    }
};