const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    return user;
};

// Login user
const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            token: generateToken(user._id),
        };
    }
    throw new Error('Invalid credentials');
};

// Validate user
const validateUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    generateToken,
    registerUser,
    loginUser,
    validateUser,
};