const express = require('express');
const router = express.Router();

const adminSchema = require('../models/adminSchema');

// Create Admin
router.post('/register', (req, res) => {
    const admin = new adminSchema(req.body);
    admin.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/register', (req, res) => {
    adminSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/register/:id', (req, res) => {
    const { id } = req.params;
    adminSchema.findById(id)
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
    adminSchema.updateOne({ _id: id }, { username, password })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.delete('/register/:id', (req, res) => {
    const { id } = req.params;
    adminSchema.deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
