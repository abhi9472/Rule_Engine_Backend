const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/rules');
require('dotenv').config();
const cors = require('cors');



const app = express();
app.use(cors());

const PORT =5001;


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/rules', ruleRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
