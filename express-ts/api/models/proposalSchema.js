const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        activities: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'Activity',
                required: true,
                default: []
            }
        ]
    }
);

const Proposal = mongoose.model('Proposal', proposalSchema);
module.exports = Proposal;