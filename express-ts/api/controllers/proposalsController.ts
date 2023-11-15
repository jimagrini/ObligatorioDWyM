import mongoose from 'mongoose';
import Proposal, { ProposalDocument } from '../models/proposalSchema';

class ProposalsController {

    constructor() { }

    async getProposals(): Promise<ProposalDocument[]> {
        return Proposal.find().exec();
    }

    async getProposalById(id: string): Promise<ProposalDocument | null> {
        return Proposal.findById(id).exec();
    }

    async addProposal(name: string, activities: mongoose.Types.ObjectId[]): Promise<ProposalDocument> {
        const newProposal = await Proposal.create({ name, activities });
        return newProposal;
    }

    async deleteProposal(id: string): Promise<boolean> {
        const result = await Proposal.findByIdAndDelete(id).exec();
        return !!result;
    }
}

/**
 * Singleton instance of ProposalsController.
 */
export const proposalsController: ProposalsController = new ProposalsController();
