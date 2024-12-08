const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./src/routes/studentRoutes');  // Make sure the path is correct

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for cross-origin requests

// Register the student routes with the '/api' prefix
app.use('/api', studentRoutes); 

// Connect to MongoDB (adjust the URI as needed)
mongoose.connect('mongodb://localhost:27017/student-course', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


