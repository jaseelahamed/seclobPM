# Product Management Application (Backend)

This is the backend API for a Product Management application built with Node.js, Express, and MongoDB.

## Features Included
- User Authentication (Register/Login) with JWT and HTTP-only cookies
- Category, Sub-Category, and Product Management
- Wishlist Functionality

## Prerequisites
- Node.js installed
- A running MongoDB instance (Local or Atlas)

## Setup Instructions

1. **Install Dependencies:**
   Navigate into the `back_end` folder and install packages:
   ```bash
   cd back_end
   npm install
   ```

2. **Environment Variables:**
   Ensure your `.env` file is set up with your MongoDB connection string and JWT Secrets:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://jaseelkp927:KAFh1X73DhfMILKg@cluster0.6nvmjyz.mongodb.net/product_management
   JWT_SECRET=seclob
   NODE_ENV=development
   ```

3. **Run the Server:**
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Default Admin User:**
   On the first run, the server will automatically create a default admin user:
   - **Email:** admin@example.com
   - **Password:** admin123
