const express = require('express');
const activitySchema = require('../models/activitySchema');
const router = express.Router();

// Create activity
router.post('/activities', async (req, res) => {
    try {
        const activity = new activitySchema(req.body);
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', details: err.message });
    }
});

// Get all activities
router.get('/activities', async (req, res) => {
    try {
        const data = await activitySchema.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', details: err.message });
    }
});

// Get activity by ID
router.get('/activities/:id', (req, res) => {
    const { id } = req.params;
    activitySchema.findById(id)
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Activity not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Update activity by ID
router.put('/activities/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, description, image } = req.body;

    activitySchema.updateOne({ _id: id }, { name, category, description, image })
        .then((data) => {
            res.status(204).send();
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Delete activity by ID
router.delete('/activities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await activitySchema.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Activity not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
