const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user'); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for parsing JSON requests
app.use(express.json()); 

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

// Mount user routes with `/api/user` prefix
app.use('/api/user/register', userRoutes);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).send('Not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
