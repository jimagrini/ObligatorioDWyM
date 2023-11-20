const express = require('express');
const ActivitiesController = require('../controllers/activitiesController');
const router = express.Router();
const activitiesController = new ActivitiesController();

// POST - Create activity
router.post('/', validateToken, async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

module.exports = router;

function validateToken(req, res, next){
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('token success')
        next()
    } else{
        res.status(401);
        res.send({'unauthorized': 'this header has no token defined'})
    }
}