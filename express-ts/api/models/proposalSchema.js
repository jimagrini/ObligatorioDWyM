
const mongoose = require('mongoose');
const activitySchema = require('./activitySchema');

const proposalSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    activities: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Activity',
        required: true
    }]

});

module.exports = mongoose.model('Proposal', proposalSchema);