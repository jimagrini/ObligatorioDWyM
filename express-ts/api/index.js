// Importaciones de módulos y configuración
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

// Configuración de Express y CORS
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Definición del puerto
const port = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

// Inicia un juego y emite un evento de Socket.io
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
            .json({ message: 'Error interno del servidor', details: `Failed to retrieve games data. Error: ${error}` });
    }
});

// Middleware para rutas de administradores, actividades, propuestas y juegos
app.use('/api/admins', adminRouter);
app.use('/api/activities', activityRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/games', gameRouter);

// Middleware de manejo de errores 404
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found');
});

// Middleware de manejo de errores 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
    }).catch((err) => console.error(err));

// Configuración de Socket.io y servidor HTTP
const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`)
});

// Configuración de Socket.io
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});

// Manejadores de eventos de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se conectó');

    socket.on('disconnect', () => {
        console.log('Un usuario se desconectó');
    });

    socket.on('startGame', ({ gameId }) => {
        console.log(`Recibido el evento startGame para el juego ${gameId}`);
        const activitiesList = gamesController.getActivities(gameId);
        runGame(activitiesList, gameId);
    });

    socket.on('sendActivities', ({ currentActivity, pos }) => {
        console.log('Recibido el evento sendActivities con actividades:', currentActivity._id);
        clearTimeout(timeoutId);
        changeActivities(activitiesList, pos);
    });
});

// Función para ejecutar un juego
function runGame(activitiesList, gameId) {
    io.emit('gameStarted', gameId);
    changeActivities(activitiesList, 0);
}

// Variables y funciones para el manejo de actividades
let timeoutId;
function changeActivities(activitiesList, pos) {
    if (activitiesList && pos < activitiesList.length) {
        const currentActivity = activitiesList[pos];
        io.emit('activityPart', currentActivity);
        console.log(activitiesList[pos].name);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            changeActivities(activitiesList, pos + 1);
        }, 10000);
    } else {
        io.emit('message', 'Fin del juego');
    }
}

// Middleware para validar el token en la solicitud
function validateToken(req, res, next) {
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('Token validado con éxito')
        next()
    } else {
        res.status(401);
        res.send({ 'no autorizado': 'esta cabecera no tiene un token definido' })
    }
}
