const express = require('express');
const blockedProjects = require('./Views/blockedProjectsModel');
const closedMosques = require('./Views/closedMosquesView');
const projects = require('./views/projectView');
const authController = require('./Controller/Auth');

const app = express();

// Middleware
app.use(express.json());

// Registering routes
app.use('/api', blockedProjects);
app.use('/api', closedMosques);
app.use('/api', projects);
app.use('/api', authController);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
