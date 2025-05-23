const express = require('express');
const authController = require('./Controller/Auth');
const cors = require('cors');

const blockedProjects = require('./Views/blockedProjectsModel');
const closedMosques = require('./Views/closedMosquesView');
const projects = require('./views/projectView');
const constructors = require('./Views/constructorsView');

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


// Registering routes
app.use('/api', authController);

// Registering routes for different models
app.use('/api', blockedProjects);
app.use('/api', closedMosques);
app.use('/api', projects);
app.use('/api', constructors);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
