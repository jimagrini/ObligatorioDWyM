const express = require('express');
const GamesController = require('../controllers/gamesController');

const router = express.Router();
const gamesController = new GamesController();

// POST - Create new Game
router.post('/', validateToken, async (req, res) => {
    try {
        const { proposal } = req.body;
        if (!proposal) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot create game.' });
        } else {
            const newGame = await gamesController.addGame(proposal);
            res.status(201)
                .json(newGame);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to create new game. Error: ${error}` });
    }
});

// GET all Games
router.get('/', async (req, res) => {
    try {
        const Games = await gamesController.getGames();
        res.status(200)
            .json(Games);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve games data. Error: ${error}` });
    }
});

// GET Game by Id
router.get('/:id',  async (req, res) => {
    const { id } = req.params;
    try {
        const Game = await gamesController.getGameById(id);
        if (!Game) {
            res.status(404)
                .json({ message: `Game '${id}' not found.` });
        } else {
            res.status(200)
                .json(Game);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve game data. Error: ${error}` });
    }
});

// DELETE Game by Id
router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const success = await gamesController.deleteGame(id);
        if (!success) {
            res.status(404)
                .json({ success: false, message: `Game '${id}' not found.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to delete game '${id}'. Error: ${error}` });
    }
});

// POST - Add new user to Game
router.post('/:id/users', validateToken, async (req, res) => {
    try {
        const { id, nickname } = req.body;
        if (!id || !nickname) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot add user to game.' });
        } else {
            const success = await gamesController.addUser(id, nickname);
            res.status(201)
                .json(success);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to add user to game. Error: ${error}` });
    }
});

// POST - Add new vote to Game
router.post('/:id/votes', validateToken, async (req, res) => {
    try {
        const { gameId, activityId, vote } = req.body;
        if (!gameId || !activityId || !vote) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot add vote to game.' });
        } else {
            const success = await gamesController.addVote(gameId, activityId, vote);
            res.status(201)
                .json(success);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to add vote to game. Error: ${error}` });
    }
});

module.exports = router;

function validateToken(req, res, next){
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('token success')
        next()
    } else{
        res.status(401);
        res.send({'unauthorized': 'this header has no token defined'})
    }
}