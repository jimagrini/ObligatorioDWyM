const mongoose = require('mongoose');
const Proposal = require('../models/proposalSchema');

class ProposalsController {
    constructor() { }

    async getProposals() {
        return Proposal.find().exec();
    }

    async getProposalById(id) {
        return Proposal.findById(id).exec();
    }

    async addProposal(name, activities) {
        const newProposal = await Proposal.create({ name, activities });
        
        const proposalWithFrontendId = { id: newProposal._id, ...newProposal.toObject() };
        return proposalWithFrontendId;
    }

    async deleteProposal(id) {
        const result = await Proposal.findByIdAndDelete(id).exec();
        return !!result;
    }
}

module.exports = ProposalsController;
