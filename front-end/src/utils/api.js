/**
 * API Service Utility
 * Handles all HTTP requests to the backend API
 * Includes automatic token management and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set the authentication token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

/**
 * Get the current user from localStorage
 * @returns {object|null} The user object or null if not found
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Set the current user in localStorage
 * @param {object} user - The user object to store
 */
export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

/**
 * Make an HTTP request to the API
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} The response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Build full URL
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse JSON response
    const data = await response.json();

    // If response is not ok, throw error with message
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Authentication API calls
 */
export const authAPI = {
  /**
   * Register a new user
   * @param {object} userData - { username, email, password }
   * @returns {Promise} { user, token }
   */
  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token and user on successful registration
    if (data.token) {
      setToken(data.token);
      setStoredUser(data.user);
    }
    
    return data;
  },

  /**
   * Login user
   * @param {object} credentials - { email, password }
   * @returns {Promise} { user, token }
   */
  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token and user on successful login
    if (data.token) {
      setToken(data.token);
      setStoredUser(data.user);
    }
    
    return data;
  },

  /**
   * Logout user
   * @returns {Promise} { message }
   */
  logout: async () => {
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage, even if API call fails
      setToken(null);
      setStoredUser(null);
    }
  },
};

/**
 * Properties API calls
 */
export const propertiesAPI = {
  /**
   * Get all properties for the current user
   * @returns {Promise} { properties: [], count }
   */
  getAll: async () => {
    const data = await apiRequest('/properties');
    return data.properties || [];
  },

  /**
   * Create a new property
   * @param {object} propertyData - { title, price, location, description, status }
   * @returns {Promise} { property }
   */
  create: async (propertyData) => {
    console.log('API: Sending property data:', propertyData); // Debug
    const data = await apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
    console.log('API: Received response:', data); // Debug
    console.log('API: Property from response:', data.property); // Debug
    return data.property;
  },

  /**
   * Update an existing property
   * @param {string} id - Property ID
   * @param {object} propertyData - Updated property data
   * @returns {Promise} { property }
   */
  update: async (id, propertyData) => {
    const data = await apiRequest(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
    return data.property;
  },

  /**
   * Delete a property
   * @param {string} id - Property ID
   * @returns {Promise} { property }
   */
  delete: async (id) => {
    await apiRequest(`/properties/${id}`, {
      method: 'DELETE',
    });
    return id; // Return the ID so the reducer can filter it out
  },
};

