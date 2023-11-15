import mongoose from 'mongoose';
import Game, { GameDocument } from '../models/gameSchema';

export class GamesController {

    constructor() { }

    async getGames(): Promise<GameDocument[]> {
        return Game.find().exec();
    }

    async getGameById(id: string): Promise<GameDocument | null> {
        return Game.findById(id).exec();
    }

    async addGame(name: string, activities: mongoose.Types.ObjectId[]): Promise<GameDocument> {
        const newGame = await Game.create({ name, activities });
        return newGame;
    }

    async deleteGame(id: string): Promise<boolean> {
        const result = await Game.findByIdAndDelete(id).exec();
        return !!result;
    }
}
