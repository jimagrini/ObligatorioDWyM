const express = require('express');
const proposalSchema = require('../models/proposalSchema');

const router = express.Router();

// Create proposal
router.post('/proposal', (req, res) => {
    const proposal = new proposalSchema(req.body);
    proposal.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/proposal', (req, res) => {
    proposalSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get('/proposal/:id', (req, res) => {
    const { id } = req.params;
    proposalSchema.findById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.put('/proposal/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    proposalSchema.updateOne({ _id: id }, { name})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.delete('/proposal/:id', (req, res) => {
    const { id } = req.params;
    proposalSchema.deleteOne({ _id: id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
