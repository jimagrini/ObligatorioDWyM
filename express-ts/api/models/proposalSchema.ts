import { Schema, Document, model, Types } from 'mongoose';

const proposalSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        activities: [
            {
                type: Types.ObjectId, ref: 'Activity',
                required: true,
                default: []
            }
        ]
    }
);

export interface ProposalDocument extends Document {
    name: string;
    activities: Types.ObjectId[];
}

const Proposal = model<ProposalDocument>('Proposal', proposalSchema);
export default Proposal;