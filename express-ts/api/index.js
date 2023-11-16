const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const proposalRouter = require('./routes/proposal');
const activityRouter = require('./routes/activity');
const gameRouter = require('./routes/game');

require('dotenv').config();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
};

const app = express();
app.use(express.json());
app.use(cors(cors));

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/api/admins', adminRouter);
app.use('/api/activities', activityRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/games', gameRouter);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log('Node API app is running on port', port);
        });
    })
    .catch((err) => console.error(err));
