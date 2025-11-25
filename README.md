# Full Stack Real Estate Management Project

A full-stack web application for managing real estate properties, built with React (frontend) and Node.js/Express (backend), connected to MongoDB Atlas.

## Project Structure

```
FullStack-Project/
├── back-end/          # Express.js API server
│   ├── config/       # Database configuration
│   ├── models/       # Mongoose models (User, Property)
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   └── server.js     # Main server file
│
└── front-end/        # React frontend application
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/        # Page components
    │   ├── store/        # Redux store
    │   └── utils/        # Utility functions
    └── package.json
```

## Features

- ✅ User authentication (Register, Login, Logout)
- ✅ Property CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB Atlas database integration
- ✅ JWT-based authentication
- ✅ Responsive React frontend
- ✅ RESTful API backend

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173` (or the port shown)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Properties (Requires Authentication)
- `GET /api/properties` - Get all properties for the authenticated user
- `POST /api/properties` - Create a new property
- `PUT /api/properties/:id` - Update a property
- `DELETE /api/properties/:id` - Delete a property

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router
- Vite
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## License

ISC

