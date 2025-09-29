const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const {
    saveOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    checkOrganizationStatus,
    getAllOrganizations
} = require('../controllers/organizationController');

// All routes require authentication
router.use(authenticateToken);

// Organization routes
router.post('/', saveOrganization);                    // Save/update organization
router.get('/', getOrganization);                      // Get user organization
router.put('/', updateOrganization);                   // Update organization
router.delete('/', deleteOrganization);                // Delete organization
router.get('/status', checkOrganizationStatus);       // Check organization completion status
router.get('/all', getAllOrganizations);              // Get all organizations (admin)

module.exports = router;
