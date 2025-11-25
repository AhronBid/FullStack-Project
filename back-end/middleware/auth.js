/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes that require authentication
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Middleware to authenticate JWT tokens
 * Extracts token from Authorization header and verifies it
 * Adds user information to req.user if token is valid
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer "

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        message: 'Access token required. Please login first.' 
      });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          message: 'Invalid or expired token. Please login again.' 
        });
      }

      // Add user information to request object
      // This allows route handlers to access user data
      // Note: userId is now a MongoDB ObjectId string
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };

      // Continue to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};

