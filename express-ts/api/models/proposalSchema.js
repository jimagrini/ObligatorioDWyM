
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
    activities: [{ type: activitySchema.Schema, ref: 'Activity' }]

});

module.exports = mongoose.model('proposal', proposalSchema);