const express = require('express');
const gameSchema = require('../models/gameSchema');
const router = express.Router();

// Create game
router.post('/games', async (req, res) => {
    try {
        const game = new gameSchema(req.body);
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', details: err.message });
    }
});

// Get all games
router.get('/games', (req, res) => {
    gameSchema.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Get game by ID
router.get('/games/:id', (req, res) => {
    const { id } = req.params;
    gameSchema.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Game not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Update game by ID
router.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    gameSchema.updateOne({ _id: id }, { name })
        .then((data) => {
            res.status(204).send(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Delete game by ID
router.delete('/games/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await gameSchema.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Game not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
