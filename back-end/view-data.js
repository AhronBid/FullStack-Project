/**
 * Quick script to view data in MongoDB
 * Run: node view-data.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Property from './models/Property.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';

async function viewData() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Get all users
    console.log('='.repeat(60));
    console.log('USERS IN DATABASE');
    console.log('='.repeat(60));
    const users = await User.find({}).select('-password'); // Exclude password
    console.log(`Total users: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user._id}`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('');
    });

    // Get all properties
    console.log('='.repeat(60));
    console.log('PROPERTIES IN DATABASE');
    console.log('='.repeat(60));
    const properties = await Property.find({});
    console.log(`Total properties: ${properties.length}\n`);
    
    properties.forEach((property, index) => {
      console.log(`Property ${index + 1}:`);
      console.log(`  ID: ${property._id}`);
      console.log(`  Title: ${property.title}`);
      console.log(`  Price: ${property.price?.toLocaleString()} ₪`);
      console.log(`  Location: ${property.location}`);
      console.log(`  Status: ${property.status}`);
      console.log(`  Type: ${property.propertyType}`);
      console.log(`  User ID: ${property.userId}`);
      console.log(`  Created: ${property.createdAt}`);
      console.log('');
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

viewData();

