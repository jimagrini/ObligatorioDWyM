const express = require('express');
const GamesController = require('../controllers/gamesController');

const router = express.Router();
const gamesController = new GamesController();

// POST - Crear nuevo juego
router.post('/', validateToken, async (req, res) => {
    const { proposal } = req.body;
    try {
        // Verificar si el parámetro necesario 'proposal' está presente en la solicitud
        if (!proposal) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede crear el juego.' });
        } else {
            // Agregar el juego utilizando el controlador de juegos
            const newGame = await gamesController.addGame(proposal);
            res.status(201)
                .json(newGame);
        }
    } catch (error) {
        console.log(`api: ${proposal}`);
        console.log(error);
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al crear el nuevo juego. Error: ${error}` });
    }
});

// GET - Obtener todos los juegos
router.get('/', async (req, res) => {
    try {
        // Obtener todos los juegos utilizando el controlador de juegos
        const games = await gamesController.getGames();
        res.status(200)
            .json(games);
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de los juegos. Error: ${error}` });
    }
});

// GET - Obtener juego por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Obtener el juego por su ID utilizando el controlador de juegos
        const game = await gamesController.getGameById(id);
        if (!game) {
            res.status(404)
                .json({ message: `Juego '${id}' no encontrado.` });
        } else {
            res.status(200)
                .json(game);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos del juego. Error: ${error}` });
    }
});

// DELETE - Eliminar juego por ID
router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar el juego por su ID utilizando el controlador de juegos
        const success = await gamesController.deleteGame(id);
        if (!success) {
            res.status(404)
                .json({ success: false, message: `Juego '${id}' no encontrado.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al eliminar el juego '${id}'. Error: ${error}` });
    }
});

// POST - Agregar nuevo usuario al juego
router.post('/:id/users', async (req, res) => {
    const { id, nickname } = req.body;
    try {
        // Verificar si los parámetros necesarios 'id' y 'nickname' están presentes en la solicitud
        if (!id || !nickname) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede agregar usuario al juego.' });
        } else {
            // Agregar el usuario utilizando el controlador de juegos
            const token = await gamesController.addUser(id, nickname);
            if (!token) {
                res.status(401)
                    .json({ error: 'Código de juego incorrecto' });
            } else {
                res.status(200)
                    .json({ auth: true, response: token });
            }
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al agregar usuario al juego. Error: ${error}` });
    }
});

// PUT - Iniciar o finalizar el juego
router.put('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        // Establecer el estado del juego utilizando el controlador de juegos
        const success = await gamesController.setGameState(id, state);
        res.status(201)
            .json(success);
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de los juegos. Error: ${error}` });
    }
});

// POST - Agregar nuevo voto al juego
router.post('/:id/votes', validateToken, async (req, res) => {
    try {
        const { gameId, activityId, vote } = req.body;
        // Verificar si los parámetros necesarios 'gameId', 'activityId' y 'vote' están presentes en la solicitud
        if (!gameId || !activityId || !vote) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede agregar voto al juego.' });
        } else {
            console.log(`Votando actividad ${activityId}, valor: ${vote}`);
            // Agregar el voto utilizando el controlador de juegos
            const success = await gamesController.addVote(gameId, activityId, vote);
            res.status(201)
                .json(success);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al agregar voto al juego. Error: ${error}` });
    }
});

// Exportar el router para que pueda ser utilizado en otros archivos
module.exports = router;

// Middleware para validar el token en la solicitud
function validateToken(req, res, next) {
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        // Extraer el token de la cabecera "Authorization"
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('Token validado con éxito')
        next();
    } else {
        // Responder con un código 401 si no se proporciona un token
        res.status(401);
        res.send({ 'no autorizado': 'esta cabecera no tiene un token definido' });
    }
}
