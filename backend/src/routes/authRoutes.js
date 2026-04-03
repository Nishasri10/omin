const express = require('express');
const { login, register } = require('../controllers/authController');
const { validateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Protected route example (for future use)
router.get('/protected', validateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;