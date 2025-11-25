# MongoDB Setup Guide

## Quick Setup Steps

### Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

1. **Create a free account:**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a cluster:**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create a database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist your IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get your connection string:**
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/real-estate?retryWrites=true&w=majority`

6. **Add to .env file:**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/real-estate?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB:**
   - Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Install following the installer instructions
   - MongoDB will start automatically as a service (Windows)

2. **Verify installation:**
   ```bash
   mongod --version
   ```

3. **Add to .env file:**
   ```bash
   MONGODB_URI=mongodb://localhost:27017/real-estate
   ```

## Install Dependencies

```bash
cd back-end
npm install
```

This will install `mongoose` which is needed to connect to MongoDB.

## Start the Server

```bash
npm start
```

You should see:
```
MongoDB Connected: ...
Server is running on port 5000
```

## What Changed

- ✅ Replaced in-memory storage with MongoDB
- ✅ Created User and Property models
- ✅ All data is now persisted in MongoDB
- ✅ Data survives server restarts
- ✅ Automatic password hashing
- ✅ Data validation

## Troubleshooting

**Connection Error:**
- Check your MongoDB URI in `.env`
- Make sure MongoDB is running (if local)
- Check network access (if using Atlas)

**Authentication Error:**
- Verify username and password in connection string
- Check database user permissions

**Port Already in Use:**
- Make sure MongoDB is running on port 27017 (default)
- Check if another MongoDB instance is running


