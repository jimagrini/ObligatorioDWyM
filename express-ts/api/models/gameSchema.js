
const mongoose = require('mongoose');
const proposalSchema = require('./proposalSchema');

const gameSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },

    users: [{ type: String }],

    proposal: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',
        required: true
    },
});

module.exports = mongoose.model('Game', gameSchema);