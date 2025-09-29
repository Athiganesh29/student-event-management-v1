const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// Save or update user profile
const saveProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profileData = req.body;

        // Check if profile already exists
        let profile = await UserProfile.findOne({ userId });

        if (profile) {
            // Update existing profile
            Object.assign(profile, profileData);
            profile.profileCompleted = true;
            profile.updatedAt = new Date();
            await profile.save();

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: profile
            });
        } else {
            // Create new profile
            profile = new UserProfile({
                userId,
                ...profileData,
                profileCompleted: true
            });
            await profile.save();

            res.status(201).json({
                success: true,
                message: 'Profile created successfully',
                data: profile
            });
        }
    } catch (error) {
        console.error('Profile save error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save profile',
            error: error.message
        });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await UserProfile.findOne({ userId })
            .populate('userId', 'firstName lastName email role');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get profile',
            error: error.message
        });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { userId },
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: profile
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
};

// Delete profile
const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await UserProfile.findOneAndDelete({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        console.error('Profile delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete profile',
            error: error.message
        });
    }
};

// Check if profile is completed
const checkProfileStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await UserProfile.findOne({ userId });

        res.status(200).json({
            success: true,
            profileCompleted: !!profile?.profileCompleted,
            hasProfile: !!profile
        });
    } catch (error) {
        console.error('Profile status check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check profile status',
            error: error.message
        });
    }
};

module.exports = {
    saveProfile,
    getProfile,
    updateProfile,
    deleteProfile,
    checkProfileStatus
};
