const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/admin');
const activityRoutes = require('./routes/activity');
const proposalRoutes = require('./routes/proposal');
const gameRoutes = require('./routes/game');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/api', adminRoutes);
app.use('/api', activityRoutes);
app.use('/api', proposalRoutes);
app.use('/api', gameRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

//mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB'); // MongoDB connection
        app.listen(port, () => {
            console.log('Node API app is running on port', port);
        });
    })
    .catch(err => console.error(err));