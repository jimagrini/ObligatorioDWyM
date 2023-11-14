const express = require('express');
const router = express.Router();
const adminSchema = require('../models/adminSchema');

// Create Admin
router.post('/admins', async (req, res) => {
    try {
        const admin = new adminSchema(req.body);
        const savedAdmin = await admin.save();
        res
            .status(201)
            .json(savedAdmin);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Internal Server Error', details: err.message });
    }
});

// Get all admins
router.get('/admins', (req, res) => {
    adminSchema.find()
        .then((data) => {
            res
                .status(200)
                .json(data);
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: 'Internal Server Error', details: err.message });
        });
});

// Get admin by ID
router.get('/admins/:id', (req, res) => {
    const { id } = req.params;
    adminSchema.findById(id)
        .then((data) => {
            if (data) {
                res
                    .status(200)
                    .json(data);
            } else {
                res
                    .status(404)
                    .json({ message: 'Admin not found' });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: 'Internal Server Error', details: err.message });
        });
});

// Update admin by ID
router.put('/admins/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    adminSchema.updateOne({ _id: id }, { username, password })
        .then((data) => {
            res
                .status(204)
                .send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: 'Internal Server Error', details: err.message });
        });
});

// Delete admin by ID
router.delete('/admins/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await adminSchema.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Admin not found' });
        }
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;