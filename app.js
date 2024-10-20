const express = require('express');
const ruleRoutes = require('./routes/rules');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/rules', ruleRoutes);

module.exports = app;
