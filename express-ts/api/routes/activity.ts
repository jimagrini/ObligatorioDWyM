import express from 'express';
import { activitiesController } from '../controllers/activitiesController';

const router = express.Router();

// POST - Create activity
router.post('/newActivity', async (req, res) => {
    try {
        const { name, category, description, image } = req.body;
        if (!name || !category || !description || !image) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot create activity.' });
        } else {
            const newActivity = await activitiesController.addActivity(name, category, description, image);
            res.status(201)
                .json(newActivity);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to create new activity. Error: ${error}` });
    }
});

// GET all Activities
router.get('/activities', async (req, res) => {
    try {
        const activities = await activitiesController.getActivities();
        res.status(200)
            .json(activities);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve activities data. Error: ${error}` });
    }
});

// GET Activity by Id
router.get('/activities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await activitiesController.getActivityById(id);
        if (!activity) {
            res.status(404)
                .json({ message: `Activity '${id}' not found.` });
        } else {
            res.status(200)
                .json(activity);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve activity data. Error: ${error}` });
    }
});

// Delete activity by ID
router.delete('/activities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const success = await activitiesController.deleteActivity(id);
        if (!success) {
            res.status(404)
                .json({ success: false, message: `Activity '${id}' not found.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to delete activity '${id}'. Error: ${error}` });
    }
});

export default router;
