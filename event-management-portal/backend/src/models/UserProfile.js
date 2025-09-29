const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say'],
        required: true
    },
    phoneCode: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty'],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true,
        default: 'Asia/Kolkata'
    },
    bio: {
        type: String,
        maxlength: 500
    },
    notifications: {
        type: Boolean,
        default: true
    },
    // Profile completion status
    profileCompleted: {
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
userProfileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
userProfileSchema.index({ userId: 1 });
userProfileSchema.index({ studentId: 1 });

module.exports = mongoose.model('UserProfile', userProfileSchema);
