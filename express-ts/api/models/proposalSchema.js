const { Schema, model, Types } = require('mongoose');

const proposalSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        activities: [
            {
                type: Types.ObjectId, 
                ref: 'Activity',
                required: true,
                default: []
            }
        ]
    }
);

const Proposal = model('Proposal', proposalSchema);
module.exports = Proposal;
