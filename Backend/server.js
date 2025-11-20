// server/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Required for connecting frontend (React) to backend (Express)

// Load environment variables from .env file
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// --- Core Middleware ---

// Enable CORS for frontend connection (Allows React on port 3000 to talk to Express on port 5000)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Update this in production
    credentials: true,
}));

// Body parser middleware: allows the app to accept JSON data in the request body
app.use(express.json());

// Body parser middleware: allows the app to accept form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));


// --- Define Routes ---

// Simple health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount the specific application routes
app.use('/api/auth', authRoutes); 
app.use('/api/properties', propertyRoutes); 
app.use('/api/users', userRoutes); 


// --- Error Handling Middleware ---

// 404 Not Found Handler (must be after all routes)
app.use(notFound);

// Custom Error Handler (must be the last middleware)
app.use(errorHandler);


// --- Start Server ---

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(` Server running in mode on port http://localhost:${PORT}`));