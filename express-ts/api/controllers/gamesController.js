const mongoose = require('mongoose');
const Game = require('../models/gameSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class GamesController {
    constructor() { }

    async getGames() {
        return Game.find().exec();
    }

    async getGameById(id) {
        return Game.findById(id).exec();
    }

    async addGame(proposal) {
        const newGame = await Game.create({ proposal: proposal });
        return newGame;
    }

    async deleteGame(id) {
        const result = await Game.findByIdAndDelete(id).exec();
        return !!result;
    }

    async addUser(id, nickname) {
        try {
            const game = await Game.findById(id);
            if (!game) {
                return false;
            }
            game.users.push(nickname);
            await game.save();
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = GamesController;
