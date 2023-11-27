const express = require('express');
const { createServer } = require("http");
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const proposalRouter = require('./routes/proposal');
const activityRouter = require('./routes/activity');
const gameRouter = require('./routes/game');

const GamesController = require('./controllers/gamesController');
const gamesController = new GamesController();

require('dotenv').config();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

app.post('/api/startGame/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        if (state) {
            const activitiesList = await gamesController.getActivities(id);
            runGame(activitiesList, id);
            io.emit('gameStarted', id);
        } else {
            io.emit('gameEnded', id);
        }
        const success = await gamesController.setGameState(id, state);
        res.status(201)
            .json(success);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve games data. Error: ${error}` });
    }
});

// Middlewares
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

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => console.error(err));

// SOCKETS

const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});

io.on('connection', () => {
    console.log('A user connected');

    io.on('disconnect', () => {
        console.log('A user disconnected!');
    });

    /*io.on('sendActivities', (activities) => {
        console.log('Received sendActivities event with activities:', activities);
        runGame(activities, 0);
    });*/


});

function runGame(activitiesList, gameId) {
    const pos = 0;
    if (activitiesList && activitiesList.length && pos < activitiesList.length) {
        const currentActivity = activitiesList[pos];
        io.emit('gameStarted', gameId);
        io.emit('activityPart', currentActivity);

        setTimeout(() => {
            runGame(activitiesList, pos + 1);
            console.log(activitiesList[0].name);
        }, 10000);
    } else {
        io.emit('message', 'fin juego');
    }
}

function validateToken(req, res, next) {
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('token success')
        next()
    } else {
        res.status(401);
        res.send({ 'unauthorized': 'this header has no token defined' })
    }
}