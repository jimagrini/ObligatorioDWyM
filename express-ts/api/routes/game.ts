import express from 'express';
import { GamesController } from "../controllers/gamesController";

const router = express.Router();
const gamesController: GamesController = new GamesController();

// POST - Create new Game
router.post('/newGame', async (req, res) => {
    try {
        const { name, activities } = req.body;
        if (!name || !activities) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot create game.' });
        } else {
            const newGame = await gamesController.addGame(name, activities);
            res.status(201)
                .json(newGame);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to create new game. Error: ${error}` });
    }
});

// GET all Games
router.get('/games', async (req, res) => {
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
router.get('/games/:id', async (req, res) => {
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
router.delete('/games/:id', async (req, res) => {
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

export default router;
