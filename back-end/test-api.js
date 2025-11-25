/**
 * Simple API Test Script
 * Run this to test your backend endpoints
 * Usage: node test-api.js
 */

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'testpassword123'
};

let authToken = null;
let userId = null;
let propertyId = null;

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 500, data: { message: error.message } };
  }
}

/**
 * Test functions
 */
async function testHealthCheck() {
  console.log('\n1. Testing Health Check...');
  const result = await apiRequest('/health');
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testRegister() {
  console.log('\n2. Testing User Registration...');
  const result = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(testUser),
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  
  if (result.status === 201 && result.data.token) {
    authToken = result.data.token;
    userId = result.data.user.id;
    console.log('✓ Registration successful! Token saved.');
    return true;
  }
  return false;
}

async function testLogin() {
  console.log('\n3. Testing User Login...');
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password,
    }),
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  
  if (result.status === 200 && result.data.token) {
    authToken = result.data.token;
    console.log('✓ Login successful! Token saved.');
    return true;
  }
  return false;
}

async function testCreateProperty() {
  console.log('\n4. Testing Create Property...');
  const propertyData = {
    title: 'Beautiful Apartment in Tel Aviv',
    price: 2500000,
    location: 'Tel Aviv, Israel',
    description: '3 bedroom apartment with sea view',
    status: 'available'
  };
  
  const result = await apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(propertyData),
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  
  if (result.status === 201 && result.data.property) {
    propertyId = result.data.property.id;
    console.log('✓ Property created! ID:', propertyId);
    return true;
  }
  return false;
}

async function testGetProperties() {
  console.log('\n5. Testing Get All Properties...');
  const result = await apiRequest('/properties');
  console.log('Status:', result.status);
  console.log('Properties count:', result.data.properties?.length || 0);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testUpdateProperty() {
  if (!propertyId) {
    console.log('\n6. Skipping Update Property (no property ID)');
    return false;
  }
  
  console.log('\n6. Testing Update Property...');
  const result = await apiRequest(`/properties/${propertyId}`, {
    method: 'PUT',
    body: JSON.stringify({
      price: 2600000,
      description: 'Updated description - 3 bedroom apartment with amazing sea view'
    }),
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testDeleteProperty() {
  if (!propertyId) {
    console.log('\n7. Skipping Delete Property (no property ID)');
    return false;
  }
  
  console.log('\n7. Testing Delete Property...');
  const result = await apiRequest(`/properties/${propertyId}`, {
    method: 'DELETE',
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  return result.status === 200;
}

async function testLogout() {
  console.log('\n8. Testing Logout...');
  const result = await apiRequest('/auth/logout', {
    method: 'POST',
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  return result.status === 200;
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('='.repeat(50));
  console.log('API TEST SUITE');
  console.log('='.repeat(50));
  
  const results = {
    healthCheck: await testHealthCheck(),
    register: await testRegister(),
    login: await testLogin(),
    createProperty: await testCreateProperty(),
    getProperties: await testGetProperties(),
    updateProperty: await testUpdateProperty(),
    deleteProperty: await testDeleteProperty(),
    logout: await testLogout(),
  };
  
  console.log('\n' + '='.repeat(50));
  console.log('TEST RESULTS');
  console.log('='.repeat(50));
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${test}: ${passed ? '✓ PASSED' : '✗ FAILED'}`);
  });
  
  const passedCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\nTotal: ${passedCount}/${totalCount} tests passed`);
  console.log('='.repeat(50));
}

// Run tests if this file is executed directly
runTests().catch(console.error);

