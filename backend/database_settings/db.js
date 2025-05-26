const { Sequelize } = require('sequelize');
const path = require('path');
const express = require('express');

const sequelize = new Sequelize('awkaf_db', 'postgres', 'AWsabry2000', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Configure static file serving
const configureStaticFiles = (app) => {
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
};

module.exports = {
    sequelize,
    configureStaticFiles
};
