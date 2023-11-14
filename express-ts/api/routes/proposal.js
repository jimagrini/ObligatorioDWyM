const express = require('express');
const proposalSchema = require('../models/proposalSchema');

const router = express.Router();


// Create proposal
router.post('/proposals', async (req, res) => {
    try {
        const proposal = new proposalSchema(req.body);
        const savedProposal = await proposal.save();
        res.status(201).json(savedProposal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/proposals', (req, res) => {
    proposalSchema.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

router.get('/proposals/:id', (req, res) => {
    const { id } = req.params;
    proposalSchema.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'Proposal not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

// Update proposal by ID
router.put('/proposals/:id', (req, res) => {
    const { id } = req.params;
    const { name, activities } = req.body;
    proposalSchema.updateOne({ _id: id }, { name, activities })
        .then((data) => {
            res.status(204).send();
        })
        .catch((err) => {
            res.status(500).json({ message: 'Internal Server Error', details: err.message });
        });
});

router.delete('/proposals/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await proposalSchema.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Proposal not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error', details: err.message });
    }
});


module.exports = router;
