import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Note: This import will resolve once the Admin model is created in Phase 2
import Admin from '../models/User.js';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/quiz_app");
    console.log('MongoDB connected for seeding...');

    // Check if admin already exists (idempotent)
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin
    await Admin.create({
      email: 'admin@example.com',
      password: hashedPassword
    });

    console.log('Admin seeded successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
