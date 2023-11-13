
const mongoose = require('mongoose');
const proposalSchema = require('./proposalSchema');

const activitySchema = require('./activitySchema');

var actvs  = mongoose.model('Activity', activitySchema);

const proposalSchema = new mongoose.Schema({

    name:  {
        type: String,
        required: true
    },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]

});

module.exports = mongoose.model('proposal', proposalSchema);