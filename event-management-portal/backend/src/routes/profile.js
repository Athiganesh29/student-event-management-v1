const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const {
    saveProfile,
    getProfile,
    updateProfile,
    deleteProfile,
    checkProfileStatus
} = require('../controllers/profileController');

// All routes require authentication
router.use(authenticateToken);

// Profile routes
router.post('/', saveProfile);                    // Save/update profile
router.get('/', getProfile);                      // Get user profile
router.put('/', updateProfile);                   // Update profile
router.delete('/', deleteProfile);                // Delete profile
router.get('/status', checkProfileStatus);       // Check profile completion status

module.exports = router;
