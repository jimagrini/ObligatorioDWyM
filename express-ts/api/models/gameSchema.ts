
import { Schema, Document, model, Types } from 'mongoose';

const gameSchema = new Schema(
    {
        users: [
            {
                type: [String],
                default: []
            }
        ],
        proposal: {
            type: Types.ObjectId, 
            ref: 'Proposal',
            required: true
        },
    }
);

export interface GameDocument extends Document {
    users: string[];
    proposal: Types.ObjectId;
}

const Game = model<GameDocument>('Game', gameSchema);
export default Game;