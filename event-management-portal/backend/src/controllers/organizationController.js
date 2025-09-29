const Organization = require('../models/Organization');
const User = require('../models/User');

// Save or update organization details
const saveOrganization = async (req, res) => {
    try {
        const userId = req.user.id;
        const organizationData = req.body;

        // Check if organization already exists
        let organization = await Organization.findOne({ userId });

        if (organization) {
            // Update existing organization
            Object.assign(organization, organizationData);
            organization.organizationCompleted = true;
            organization.updatedAt = new Date();
            await organization.save();

            res.status(200).json({
                success: true,
                message: 'Organization details updated successfully',
                data: organization
            });
        } else {
            // Create new organization
            organization = new Organization({
                userId,
                ...organizationData,
                organizationCompleted: true
            });
            await organization.save();

            res.status(201).json({
                success: true,
                message: 'Organization details created successfully',
                data: organization
            });
        }
    } catch (error) {
        console.error('Organization save error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save organization details',
            error: error.message
        });
    }
};

// Get organization details
const getOrganization = async (req, res) => {
    try {
        const userId = req.user.id;

        const organization = await Organization.findOne({ userId })
            .populate('userId', 'firstName lastName email role');

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization details not found'
            });
        }

        res.status(200).json({
            success: true,
            data: organization
        });
    } catch (error) {
        console.error('Get organization error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get organization details',
            error: error.message
        });
    }
};

// Update organization
const updateOrganization = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        const organization = await Organization.findOneAndUpdate(
            { userId },
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization details not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Organization details updated successfully',
            data: organization
        });
    } catch (error) {
        console.error('Organization update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update organization details',
            error: error.message
        });
    }
};

// Delete organization
const deleteOrganization = async (req, res) => {
    try {
        const userId = req.user.id;

        const organization = await Organization.findOneAndDelete({ userId });

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization details not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Organization details deleted successfully'
        });
    } catch (error) {
        console.error('Organization delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete organization details',
            error: error.message
        });
    }
};

// Check if organization is completed
const checkOrganizationStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const organization = await Organization.findOne({ userId });

        res.status(200).json({
            success: true,
            organizationCompleted: !!organization?.organizationCompleted,
            hasOrganization: !!organization
        });
    } catch (error) {
        console.error('Organization status check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check organization status',
            error: error.message
        });
    }
};

// Get all organizations (for admin)
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find()
            .populate('userId', 'firstName lastName email role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: organizations
        });
    } catch (error) {
        console.error('Get all organizations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get organizations',
            error: error.message
        });
    }
};

module.exports = {
    saveOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    checkOrganizationStatus,
    getAllOrganizations
};
