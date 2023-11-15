const express = require('express');
const proposalSchema = require('../models/proposalSchema');

const router = express.Router();


// Create proposal
router.post('/proposals', async (req, res) => {
    try {
        const proposals = await proposalSchema.create(req.body);
        res.status(201)
            .json(proposals);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get all proposals
router.get('/proposals', async (req, res) => {
    try {
        const proposals = await proposalSchema.find({});
        res.status(200)
            .json(proposals);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get proposal by ID
router.get('/proposals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const proposal = await proposalSchema.findById(id);
        if (proposal) {
            res.status(200)
                .json(proposal);
        } else {
            res.status(404)
                .json({ message: `Cannot find any proposal with ID '${id}'` });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Update proposal by ID
router.put('/proposals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, activities } = req.body;
        const proposal = await proposalSchema.findByIdAndUpdate(id, { name, activities }, { new: true });
        if (!proposal) {
            return res.status(404)
                .json({ message: `Cannot find any proposal with ID '${id}'` });
        }
        const updatedProposal = await proposalSchema.findById(id);
        res.status(200)
            .json(updatedProposal);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Delete proposal by ID
router.delete('/proposals/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const proposal = await proposalSchema.findByIdAndDelete({ _id: id });
        if (!proposal) {
            res.status(404)
                .json({ success: false, message: `Cannot find any proposal with ID '${id}'` });
        }
        res.status(200)
            .json({ success: true })
    } catch (error) {
        res.status(500)
            .json({ success: false, message: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;
