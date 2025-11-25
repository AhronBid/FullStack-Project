/**
 * Properties Routes
 * Handles CRUD operations for real estate properties
 * All routes require authentication (protected by auth middleware)
 */

import express from 'express';
import mongoose from 'mongoose';
import { authenticateToken } from '../middleware/auth.js';
import Property from '../models/Property.js';

const router = express.Router();

// All property routes require authentication
router.use(authenticateToken);

/**
 * GET /api/properties
 * Get all properties belonging to the authenticated user
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all properties belonging to the current user
    const userProperties = await Property.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: 'Properties retrieved successfully',
      properties: userProperties,
      count: userProperties.length
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Error retrieving properties' });
  }
});

/**
 * POST /api/properties
 * Create a new property
 * Body: { title, price, location, description, status }
 */
router.post('/', async (req, res) => {
  try {
    const { title, price, location, description, status, propertyType, image } = req.body;
    const userId = req.user.userId;

    // Validation: Check required fields
    if (!title || !price || !location) {
      return res.status(400).json({ 
        message: 'Title, price, and location are required' 
      });
    }

    // Validation: Price must be a positive number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ 
        message: 'Price must be a positive number' 
      });
    }

    // Extract size and rooms from request body
    const sizeValue = req.body.size !== undefined && req.body.size !== null && req.body.size !== '' ? parseFloat(req.body.size) : null;
    const roomsValue = req.body.rooms !== undefined && req.body.rooms !== null && req.body.rooms !== '' ? parseInt(req.body.rooms) : null;

    // Create new property in MongoDB
    const newProperty = await Property.create({
      userId,
      title,
      price: parseFloat(price),
      location,
      description: description || '',
      status: status || 'available',
      propertyType: propertyType || 'apartment',
      image: image || null,
      size: sizeValue,
      rooms: roomsValue,
    });

    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Error creating property' });
  }
});

/**
 * PUT /api/properties/:id
 * Update an existing property
 * Body: { title?, price?, location?, description?, status? }
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, price, location, description, status, size, rooms, propertyType, image } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        message: 'Invalid property ID' 
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (price !== undefined) {
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
          message: 'Price must be a positive number' 
        });
      }
      updateData.price = parseFloat(price);
    }
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (size !== undefined) updateData.size = size !== null && size !== '' ? parseFloat(size) : null;
    if (rooms !== undefined) updateData.rooms = rooms !== null && rooms !== '' ? parseInt(rooms) : null;
    if (propertyType !== undefined) updateData.propertyType = propertyType || 'apartment';
    if (image !== undefined) updateData.image = image || null;

    // Find and update the property (only if it belongs to the user)
    const property = await Property.findOneAndUpdate(
      { _id: id, userId }, // Ensure property belongs to user
      { $set: updateData },
      { new: true, runValidators: true } // Return updated document
    );

    // Check if property exists and belongs to the user
    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found or you do not have permission to edit it' 
      });
    }

    res.json({
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Error updating property' });
  }
});

/**
 * DELETE /api/properties/:id
 * Delete a property
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        message: 'Invalid property ID' 
      });
    }

    // Find and delete the property (only if it belongs to the user)
    const deletedProperty = await Property.findOneAndDelete({ _id: id, userId });

    // Check if property exists and belongs to the user
    if (!deletedProperty) {
      return res.status(404).json({ 
        message: 'Property not found or you do not have permission to delete it' 
      });
    }

    res.json({
      message: 'Property deleted successfully',
      property: deletedProperty
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Error deleting property' });
  }
});

export default router;

