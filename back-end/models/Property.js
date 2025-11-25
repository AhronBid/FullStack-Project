/**
 * Property Model
 * Mongoose schema for real estate properties
 */

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available',
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'penthouse', 'commercial'],
    default: 'apartment',
  },
  image: {
    type: String,
    default: null,
  },
  size: {
    type: Number,
    default: null,
    min: [0, 'Size must be positive'],
  },
  rooms: {
    type: Number,
    default: null,
    min: [0, 'Rooms must be positive'],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Index for faster queries
propertySchema.index({ userId: 1 });
propertySchema.index({ status: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;


