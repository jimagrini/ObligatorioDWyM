const express = require('express');
const userSchema = require('../models/userSchema');

const router = express.Router();

// Create user
router.post('/register', (req, res) => {
    const user = new userSchema(req.body);
    user.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/register', (req, res) => {
    userSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/register/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.put('/register/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    userSchema.updateOne({ _id: id }, { username, password })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.delete('/register/:id', (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
