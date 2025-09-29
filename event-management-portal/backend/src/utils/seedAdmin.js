const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zvent');
        console.log('Connected to MongoDB for seeding...');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@zvent.com' });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Admin credentials:');
            console.log('Email: admin@zvent.com');
            console.log('Password: Admin123!');
            return;
        }

        // Create admin user
        const adminUser = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@zvent.com',
            password: 'Admin123!',
            role: 'admin',
            isVerified: true,
            newsletter: false
        });

        await adminUser.save();

        console.log('✅ Admin user created successfully!');
        console.log('Admin credentials:');
        console.log('Email: admin@zvent.com');
        console.log('Password: Admin123!');
        console.log('Role: admin');

    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
    seedAdmin();
}

module.exports = seedAdmin;
