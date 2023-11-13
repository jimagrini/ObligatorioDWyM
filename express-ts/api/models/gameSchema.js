
const mongoose = require('mongoose');
const proposalSchema = require('./proposalSchema');

const gameSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },

    users: [{ type: String }],

    proposal: {
        type: proposalSchema.Schema,
        ref: 'proposalSchema',
        required: true
    },
});

module.exports = mongoose.model('game', gameSchema);