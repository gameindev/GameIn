const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const indexRoutes = require('./routes/index');
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (you can restrict this to specific origins if needed)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data (form-data)
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use('/', indexRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
