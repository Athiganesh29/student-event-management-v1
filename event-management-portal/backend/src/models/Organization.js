const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // University/Institution Information
    universityName: {
        type: String,
        required: true,
        trim: true
    },
    campusLocation: {
        type: String,
        required: true,
        trim: true
    },
    orgType: {
        type: String,
        enum: [
            'student-club',
            'department',
            'student-union',
            'cultural-society',
            'sports-team',
            'academic-society',
            'volunteer-group',
            'professional-body'
        ],
        required: true
    },
    organizationName: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        enum: [
            'president',
            'vice-president',
            'secretary',
            'treasurer',
            'event-coordinator',
            'committee-member',
            'faculty-advisor',
            'department-head'
        ],
        required: true
    },
    orgSize: {
        type: String,
        enum: ['small', 'medium', 'large', 'very-large']
    },
    focusAreas: [{
        type: String,
        enum: [
            'academic',
            'cultural',
            'sports',
            'tech',
            'social',
            'volunteer'
        ]
    }],
    eventFrequency: {
        type: String,
        enum: ['1-3', '4-6', '7-10', '11+']
    },
    // Contact Information
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        trim: true
    },
    socialMedia: {
        instagram: String,
        facebook: String,
        twitter: String,
        linkedin: String
    },
    // Organization Description
    description: {
        type: String,
        maxlength: 1000
    },
    goals: {
        type: String,
        maxlength: 1000
    },
    // Status and Verification
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Organization completion status
    organizationCompleted: {
        type: Boolean,
        default: false
    },
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update the updatedAt field before saving
organizationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
organizationSchema.index({ userId: 1 });
organizationSchema.index({ organizationName: 1 });
organizationSchema.index({ universityName: 1 });

module.exports = mongoose.model('Organization', organizationSchema);
