
const mongoose = require('mongoose');
const proposalSchema = require('./proposalSchema');

const gameSchema = new mongoose.Schema(
    {
        users: [
            {
                type: String,
                default: []
            }
        ],
        proposal: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',
            required: true
        },
    }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;