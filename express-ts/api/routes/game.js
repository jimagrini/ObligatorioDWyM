const express = require('express');
const gameSchema = require('../models/gameSchema');
const router = express.Router();

// Create game
router.post('/games', async (req, res) => {
    try {
        const game = await gameSchema.create(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get all games
router.get('/games', async (req, res) => {
    try {
        const games = await gameSchema.find({});
        res.status(200)
            .json(games);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get game by ID
router.get('/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const game = await gameSchema.findById(id);
        if (game) {
            res.status(200)
                .json(game);
        } else {
            res.status(404)
                .json({ message: `Cannot find any game with ID '${id}'` });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Update game by ID
router.put('/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { users, proposal } = req.body;
        const game = await gameSchema.findByIdAndUpdate(id, { users, proposal }, { new: true });
        if (!game) {
            return res.status(404)
                .json({ message: `Cannot find any game with ID '${id}'` });
        }
        const updatedGame = await gameSchema.findById(id);
        res.status(200)
            .json(updatedGame);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Delete game by ID
router.delete('/games/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const game = await gameSchema.findByIdAndDelete({ _id: id });
        if (!game) {
            res.status(404)
                .json({ success: false, message: `Cannot find any game with ID '${id}'` });
        }
        res.status(200)
            .json({ success: true })
    } catch (error) {
        res.status(500)
            .json({ success: false, message: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;
