# Frontend Setup - Connecting to Backend

## Quick Start

1. **Create environment file:**
   ```bash
   # In the front-end folder, create a .env file:
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Start the backend server:**
   ```bash
   cd back-end
   npm start
   ```

3. **Start the frontend:**
   ```bash
   cd front-end
   npm run dev
   ```

## How It Works

### API Service (`src/utils/api.js`)
- Handles all HTTP requests to the backend
- Automatically includes JWT tokens in requests
- Manages token storage in localStorage
- Provides easy-to-use functions: `authAPI` and `propertiesAPI`

### Redux Slices
- **authSlice.js**: Manages user authentication
  - `registerUser()` - Register new user
  - `loginUser()` - Login user
  - `logoutUser()` - Logout user

- **propertiesSlice.js**: Manages properties
  - `fetchProperties()` - Get all properties
  - `createProperty()` - Create new property
  - `updateProperty()` - Update property
  - `deleteProperty()` - Delete property

## Usage Example

### In a React Component:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { fetchProperties } from '../store/slices/propertiesSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { properties, isLoading } = useSelector(state => state.properties);

  const handleLogin = async () => {
    await dispatch(loginUser({ email: 'user@example.com', password: 'password' }));
  };

  const loadProperties = async () => {
    await dispatch(fetchProperties());
  };

  return (
    // Your component JSX
  );
}
```

## API Configuration

The API base URL is set in `src/utils/api.js`:
- Default: `http://localhost:5000/api`
- Can be overridden with `VITE_API_URL` environment variable

Make sure your backend is running on port 5000 (or update the URL accordingly).
