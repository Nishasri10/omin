const jwt = require('jsonwebtoken');
const User = require('../models/User');

const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = roleMiddleware;