
const mongoose = require('mongoose');
const gameSchema = require('./gameSchema');

const proposalSchemaSchema = require('./proposalSchema');
const adminSchema = require('./adminSchema');

var actvs  = mongoose.model('Proposal', proposalSchemaSchema);

const gameSchema = new mongoose.Schema({

    id:  {
        type: Number,
        required: true
    },

    users:  {
        type: String,
        required: true
    },
    fromDate:  {
        type: Date,
        required: true
    },
    upToDate:  {
        type: Date,
        required: true
    },


    proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'proposalSchema' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'adminSchema' }]

});

module.exports = mongoose.model('proposal', proposalSchema);