const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/api', adminRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});

app.listen(port, () => {
    console.log('Listening on port', port);
});