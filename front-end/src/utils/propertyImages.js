/**
 * Property Images Utility
 * Provides different default images based on property type
 */

// Array of different property images from Unsplash
const propertyImages = {
  apartment: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  ],
  house: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  ],
  villa: [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dbe4eb5f5?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    'https://images.unsplash.com/photo-1600607688969-a5fcd26c57b1?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ],
  penthouse: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
  ],
  commercial: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  ],
};

/**
 * Get a random image for a property type
 * @param {string} propertyType - The type of property
 * @param {string|number} seed - Optional seed (like property ID) to get consistent image for same property
 * @returns {string} Image URL
 */
export const getPropertyImage = (propertyType = 'apartment', seed = null) => {
  const type = propertyType.toLowerCase();
  const images = propertyImages[type] || propertyImages.apartment;
  
  // If seed is provided (like property ID), use it to consistently select an image
  if (seed !== null) {
    const seedNum = typeof seed === 'string' ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : seed;
    return images[seedNum % images.length];
  }
  
  // Otherwise return random image
  return images[Math.floor(Math.random() * images.length)];
};

/**
 * Get default image for property type
 * @param {string} propertyType - The type of property
 * @returns {string} Image URL
 */
export const getDefaultPropertyImage = (propertyType = 'apartment') => {
  return getPropertyImage(propertyType, null);
};

export default propertyImages;


