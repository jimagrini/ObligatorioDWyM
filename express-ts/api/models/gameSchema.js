const { Schema, model, Types } = require('mongoose');

const gameSchema = new Schema(
    {
        users: [
            {
                type: String,
                required: true,
                default: []
            }
        ],
        proposal:
        {
            type: Types.ObjectId,
            ref: 'Proposal',
            required: true
        },
        votes:
        {
            type: Map,
            of: Number,
            default: new Map()
        },
        currentActivity:
        {
            type: Types.ObjectId,
            ref: 'Activity',
            default: null
        },
        active:
        {
            type: Boolean,
            default: false
        }
    }
);

const Game = model('Game', gameSchema);
module.exports = Game;
