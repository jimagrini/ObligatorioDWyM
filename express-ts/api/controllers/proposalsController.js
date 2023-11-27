const mongoose = require('mongoose');
const Proposal = require('../models/proposalSchema');

class ProposalsController {
    constructor() { }

    async getProposals() {
        return Proposal.find().exec();
    }

    async getProposalById(id) {
        return Proposal.findById(id).populate('activities').exec();
    }

    async addProposal(name, activities) {
        const newProposal = await Proposal.create({ name, activities });
        const proposal= await this.getProposalById(newProposal._id);
        return proposal;
    }

    async deleteProposal(id) {
        const result = await Proposal.findByIdAndDelete(id).exec();
        return !!result;
    }
}

module.exports = ProposalsController;
