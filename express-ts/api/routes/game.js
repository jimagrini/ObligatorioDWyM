const express = require('express');
const gameSchema = require('../models/gameSchema');

const router = express.Router();

// Create game
router.post('/game', (req, res) => {
    const game = new gameSchema(req.body);
    game.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/game', (req, res) => {
    gameSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/game/:id', (req, res) => {
    const { id } = req.params;
    gameSchema.findById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.put('/game/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    gameSchema.updateOne({ _id: id }, { name})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.delete('/game/:id', (req, res) => {
    const { id } = req.params;
    gameSchema.deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
