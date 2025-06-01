require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, configureStaticFiles } = require('./database_settings/db');
const users = require('./Views/UserView');
const blockedProjects = require('./Views/blockedProjectsView');
const closedMosques = require('./Views/closedMosquesView');
const projects = require('./Views/projectView');
const constructors = require('./Views/constructorsView');
const loginRoutes = require('./Views/loginView'); // Correct import for loginView.js

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify exact origin instead of '*'
  credentials: true, // Allow credentials (since your frontend uses withCredentials: true)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure static file serving
configureStaticFiles(app);

// Make sequelize available to routes
app.use((req, res, next) => {
  req.sequelize = sequelize;
  next();
});

// Registering routes
app.use('/api', users);

// Registering routes for different models
app.use('/api', blockedProjects);
app.use('/api', closedMosques);
app.use('/api', projects);
app.use('/api', constructors);
app.use('/api', loginRoutes); // Use the router object directly

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
