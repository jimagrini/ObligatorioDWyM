const express = require('express');
const ProposalsController = require('../controllers/proposalsController');

const router = express.Router();
const proposalsController = new ProposalsController();

// POST - Create new Proposal
router.post('/', validateToken,async (req, res) => {
    try {
        const { name, activities } = req.body;
        if (!name) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot create proposal.' });
        } else {
            const newProposal = await proposalsController.addProposal(name, activities);
            res.status(201)
                .json(newProposal);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to create new proposal. Error: ${error}` });
    }
});

// GET all Proposals
router.get('/', async (req, res) => {
    try {
        const proposals = await proposalsController.getProposals();
        res.status(200)
            .json(proposals);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve proposals data. Error: ${error}` });
    }
});

// GET Proposal by Id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proposal = await proposalsController.getProposalById(id);
        if (!proposal) {
            res.status(404)
                .json({ message: `Proposal '${id}' not found.` });
        } else {
            res.status(200)
                .json(proposal);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve proposal data. Error: ${error}` });
    }
});

// DELETE Proposal by Id
router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const success = await proposalsController.deleteProposal(id);
        if (!success) {
            res.status(404)
                .json({ success: false, message: `Proposal '${id}' not found.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to delete proposal '${id}'. Error: ${error}` });
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