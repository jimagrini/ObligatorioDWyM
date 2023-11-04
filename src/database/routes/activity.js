const express = require('express');
const activitySchema = require('../models/activitySchema');

const router = express.Router();

// Create activity
router.post('/activity', (req, res) => {
    const activity = new activitySchema(req.body);
    activity.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/activity', (req, res) => {
    activitySchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/activity/:id', (req, res) => {
    const { id } = req.params;
    activitySchema.findById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.put('/activity/:id', (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const { description, image } = req.body;

    activitySchema.updateOne({ _id: id }, { name, category }, { description, image } )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.delete('/activity/:id', (req, res) => {
    const { id } = req.params;
    activitySchema.deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
