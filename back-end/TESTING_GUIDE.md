# Testing Guide - Frontend & Backend Connection

This guide shows you multiple ways to test your API and frontend-backend connection.

## Method 1: Using the Test Script (Easiest)

### Step 1: Start the Backend Server
```bash
cd back-end
npm start
```

You should see:
```
Server is running on port 5000
Health check: http://localhost:5000/api/health
```

### Step 2: Run the Test Script
In a **new terminal** (keep backend running):
```bash
cd back-end
node test-api.js
```

This will test all endpoints automatically and show you the results.

---

## Method 2: Using Browser DevTools (Manual Testing)

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd back-end
npm start
```

**Terminal 2 - Frontend:**
```bash
cd front-end
npm run dev
```

### Step 2: Open Browser Console

1. Open your frontend in browser (usually `http://localhost:5173`)
2. Press `F12` to open DevTools
3. Go to the **Console** tab

### Step 3: Test API Calls in Console

Copy and paste these commands one by one:

```javascript
// Test 1: Health Check
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log('Health:', data));

// Test 2: Register User
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@example.com',
    password: 'test123'
  })
})
  .then(r => r.json())
  .then(data => {
    console.log('Register:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  });

// Test 3: Login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
})
  .then(r => r.json())
  .then(data => {
    console.log('Login:', data);
    localStorage.setItem('token', data.token);
  });

// Test 4: Get Properties (requires token)
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/properties', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(r => r.json())
  .then(data => console.log('Properties:', data));

// Test 5: Create Property
fetch('http://localhost:5000/api/properties', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My First Property',
    price: 1000000,
    location: 'Tel Aviv',
    description: 'Beautiful apartment',
    status: 'available'
  })
})
  .then(r => r.json())
  .then(data => console.log('Created:', data));
```

---

## Method 3: Using Postman or Thunder Client (VS Code Extension)

### Using Thunder Client (VS Code Extension)

1. **Install Thunder Client** extension in VS Code
2. **Create a new request:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/health`
   - Click "Send"
   - Should return: `{ status: 'OK', message: 'Server is running' }`

3. **Test Registration:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "test123"
     }
     ```

4. **Test Login:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "test123"
     }
     ```
   - Copy the `token` from response

5. **Test Get Properties (with auth):**
   - Method: `GET`
   - URL: `http://localhost:5000/api/properties`
   - Headers: 
     - `Authorization: Bearer <paste-token-here>`

6. **Test Create Property:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/properties`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer <paste-token-here>`
   - Body (JSON):
     ```json
     {
       "title": "Beautiful Apartment",
       "price": 2500000,
       "location": "Tel Aviv",
       "description": "3 bedroom with sea view",
       "status": "available"
     }
     ```

---

## Method 4: Test from Frontend Components

### Example: Test Login Component

```javascript
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';

function TestLogin() {
  const dispatch = useDispatch();

  const handleTest = async () => {
    try {
      const result = await dispatch(loginUser({
        email: 'test@example.com',
        password: 'test123'
      }));
      console.log('Login result:', result);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <button onClick={handleTest}>Test Login</button>;
}
```

### Example: Test Properties

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, createProperty } from '../store/slices/propertiesSlice';

function TestProperties() {
  const dispatch = useDispatch();
  const { properties, isLoading } = useSelector(state => state.properties);

  const testFetch = () => {
    dispatch(fetchProperties());
  };

  const testCreate = () => {
    dispatch(createProperty({
      title: 'Test Property',
      price: 1000000,
      location: 'Tel Aviv',
      description: 'Test description'
    }));
  };

  return (
    <div>
      <button onClick={testFetch}>Fetch Properties</button>
      <button onClick={testCreate}>Create Property</button>
      {isLoading && <p>Loading...</p>}
      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </div>
  );
}
```

---

## Common Issues & Solutions

### Issue: "CORS error"
**Solution:** Make sure CORS is enabled in backend (it is in `server.js`)

### Issue: "Cannot connect to server"
**Solution:** 
- Check if backend is running on port 5000
- Check if you're using the correct URL: `http://localhost:5000/api`

### Issue: "401 Unauthorized"
**Solution:**
- Make sure you're sending the token in Authorization header
- Format: `Authorization: Bearer <your-token>`
- Check if token is valid (not expired)

### Issue: "404 Not Found"
**Solution:**
- Check the endpoint URL is correct
- Make sure backend server is running
- Check route paths match exactly

---

## Quick Test Checklist

- [ ] Backend server starts without errors
- [ ] Health check endpoint works: `GET /api/health`
- [ ] Can register a new user: `POST /api/auth/register`
- [ ] Can login: `POST /api/auth/login`
- [ ] Can get properties (with token): `GET /api/properties`
- [ ] Can create property: `POST /api/properties`
- [ ] Can update property: `PUT /api/properties/:id`
- [ ] Can delete property: `DELETE /api/properties/:id`
- [ ] Frontend can connect to backend
- [ ] Redux actions work from frontend

---

## Expected Responses

### Successful Registration:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Successful Login:
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Successful Property Creation:
```json
{
  "message": "Property created successfully",
  "property": {
    "id": "...",
    "userId": "...",
    "title": "Beautiful Apartment",
    "price": 2500000,
    "location": "Tel Aviv",
    "description": "3 bedroom with sea view",
    "status": "available",
    "createdAt": "2025-11-24T...",
    "updatedAt": "2025-11-24T..."
  }
}
```

Happy testing! 🚀


