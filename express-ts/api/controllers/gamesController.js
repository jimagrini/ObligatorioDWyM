const mongoose = require('mongoose');
const Game = require('../models/gameSchema');
const ProposalsController = require('../controllers/proposalsController');
const jwt = require('jsonwebtoken');

class GamesController {

    constructor() {
        this.proposalsController = new ProposalsController();
    }

    async getGames() {
        return Game.find().exec();
    }

    async getGameById(id) {
        return Game.findById(id)
            .populate('proposal')
            .populate('currentActivity')
            .exec();
    }

    async addGame(proposal, currentActivity) {
        const newGame = await Game.create({ proposal: proposal, currentActivity: currentActivity });

        const gameId = newGame._id;
        const game = await this.getGameById(gameId);
        return game;
    }

    async deleteGame(id) {
        const result = await Game.findByIdAndDelete(id).exec();
        return !!result;
    }

    async addUser(id, nickname) {
        try {
            const game = await Game.findById(id);
            if (!game) {
                return { error: `Game '${id}' not found` };
            }
            game.users.push(nickname);
            await game.save();
            // emit evento?
            const token = this.createToken(nickname);
            return { token };
        } catch (error) {
            console.log(error);
            return { error: 'Failed to add user' };
        }
    }

    async addVote(gameId, activityId, vote) {
        try {
            const game = await Game.findById(gameId);
            if (!game) {
                return false;
            }

            const currentVote = game.votes.get(activityId) || 0;
            game.votes.set(activityId, currentVote + vote);
            await game.save();
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    async setGameState(id, state) {
        const game = await this.getGameById(id);
        if (game) {
            game.active = state;
            if (state) {
                game.currentActivity = game.proposal.activities[0];
            }
            await game.save();
            return true;
        }
        return false;
    }

    async getActivities(gameId) {
        const game = await this.getGameById(gameId);
        const proposal = game.proposal;
        const fetchedProposal= await this.proposalsController.getProposalById(proposal._id);
        return fetchedProposal.activities;
    }

    createToken(user) {
        const payload = {
            user_token: user.token
        };
        return jwt.sign(payload, 'token', {
            expiresIn: 60 * 60 * 24
        });
    }
}

module.exports = GamesController;