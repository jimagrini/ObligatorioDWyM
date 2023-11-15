const express = require('express');
const activitySchema = require('../models/activitySchema');
const router = express.Router();

// Create activity
router.post('/activities', async (req, res) => {
    try {
        const activities = await activitySchema.create(req.body);
        res.status(201)
            .json(activities);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get all activities
router.get('/activities', async (req, res) => {
    try {
        const activities = await activitySchema.find({});
        res.status(200)
            .json(activities);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get activity by ID
router.get('/activities/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await activitySchema.findById(id);
        if (activity) {
            res.status(200)
                .json(activity);
        } else {
            res.status(404)
                .json({ message: `Cannot find any activity with ID '${id}'` });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Update activity by ID
router.put('/activities/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, image, selected } = req.body;
        const activity = await activitySchema.findByIdAndUpdate(id, { name, category, description, image, selected }, { new: true });
        if (!activity) {
            return res.status(404)
                .json({ message: `Cannot find any activity with ID '${id}'` });
        }
        const updatedActivity = await activitySchema.findById(id);
        res.status(200)
            .json(updatedActivity);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Delete activity by ID
router.delete('/activities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await activitySchema.findByIdAndDelete({ _id: id });
        if (!activity) {
            res.status(404)
                .json({ success: false, message: `Cannot find any activity with ID '${id}'` });
        }
        res.status(200)
            .json({ success: true })
    } catch (error) {
        res.status(500)
            .json({ success: false, message: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;
