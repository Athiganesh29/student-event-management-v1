const express = require('express');
const { body } = require('express-validator');
const { signup, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Validation rules
const signupValidation = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),

    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

    body('newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter must be a boolean value')
];

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
