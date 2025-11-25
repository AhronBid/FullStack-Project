# Real Estate Management Backend API

Backend server for the Real Estate Management MVP in Israel.

## Features

- User authentication (register, login, logout)
- Property CRUD operations (Create, Read, Update, Delete)
- JWT-based authentication
- MongoDB database with Mongoose ODM
- Persistent data storage (data survives server restarts)

## Setup

1. **Install MongoDB:**
   - **Option A - Local MongoDB:** Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
   - **Option B - MongoDB Atlas (Cloud):** Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Install dependencies:**
   ```bash
   cd back-end
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `JWT_SECRET` - Use a strong random string in production
   - `MONGODB_URI` - Your MongoDB connection string
     - Local: `mongodb://localhost:27017/real-estate`
     - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority`

4. **Start MongoDB (if using local):**
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: `mongod` (or `brew services start mongodb-community`)

5. **Start the server:**
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` by default and automatically connect to MongoDB.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ username, email, password }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

- `POST /api/auth/logout` - Logout user
  - Returns: `{ message }`

### Properties (Requires Authentication)

All property endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

- `GET /api/properties` - Get all properties for the authenticated user
  - Returns: `{ properties: [], count }`

- `POST /api/properties` - Create a new property
  - Body: `{ title, price, location, description?, status? }`
  - Returns: `{ property }`

- `PUT /api/properties/:id` - Update a property
  - Body: `{ title?, price?, location?, description?, status? }`
  - Returns: `{ property }`

- `DELETE /api/properties/:id` - Delete a property
  - Returns: `{ property }`

### Health Check

- `GET /api/health` - Check if server is running
  - Returns: `{ status: 'OK', message: 'Server is running' }`

## Data Models

### User
```javascript
{
  id: string,
  username: string,
  email: string,
  password: string (hashed),
  createdAt: string (ISO date)
}
```

### Property
```javascript
{
  id: string,
  userId: string,
  title: string,
  price: number,
  location: string,
  description: string,
  status: 'available' | 'sold',
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

## Notes

- **MongoDB Storage**: Data is stored in MongoDB using Mongoose. All data persists across server restarts.

- **JWT Tokens**: Tokens expire after 7 days. Users need to login again after expiration.

- **Security**: Passwords are hashed using bcrypt before storage. Never store plain text passwords.

## Future Improvements

- Add input validation library (e.g., Joi, Zod)
- Add rate limiting
- Add request logging
- Add unit tests
- Add API documentation (Swagger/OpenAPI)

