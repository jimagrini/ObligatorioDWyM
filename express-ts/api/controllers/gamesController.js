const mongoose = require('mongoose');
const Game = require('../models/gameSchema');
const ProposalsController = require('../controllers/proposalsController');
const jwt = require('jsonwebtoken');

class GamesController {

    constructor() {
        // Inicialización del controlador de propuestas para obtener funcionalidades relacionadas con propuestas
        this.proposalsController = new ProposalsController();
    }

    // Obtener todos los juegos
    async getGames() {
        // Utilizar el método find() de Mongoose para obtener todos los juegos y ejecutar la consulta
        return Game.find().exec();
    }

    // Obtener un juego por su ID, poblado con información detallada (propuesta, actividad actual, votos)
    async getGameById(id) {
        return Game.findById(id)
            .populate('proposal') // Poblar la propuesta asociada al juego
            .populate('currentActivity') // Poblar la actividad actual del juego
            .populate('votes') // Poblar los votos del juego
            .exec();
    }

    // Agregar un nuevo juego con una propuesta y actividad actual dadas
    async addGame(proposal, currentActivity) {
        // Crear un nuevo juego utilizando el método create() de Mongoose
        const newGame = await Game.create({ proposal: proposal, currentActivity: currentActivity });

        // Obtener el ID del nuevo juego
        const gameId = newGame._id;
        // Obtener información detallada del nuevo juego utilizando el método getGameById()
        const game = await this.getGameById(gameId);
        // Devolver la información detallada del nuevo juego
        return game;
    }

    // Eliminar un juego por su ID
    async deleteGame(id) {
        // Utilizar el método findByIdAndDelete() de Mongoose para eliminar un juego por su ID y ejecutar la consulta
        const result = await Game.findByIdAndDelete(id).exec();
        // Devolver un valor booleano indicando si se eliminó con éxito
        return !!result;
    }

    // Agregar un usuario a un juego por su ID y devolver un token JWT para el usuario
    async addUser(id, nickname) {
        try {
            // Obtener el juego por su ID
            const game = await Game.findById(id);
            if (!game) {
                return { error: `Game '${id}' not found` };
            }
            // Agregar el apodo del usuario a la lista de usuarios del juego
            game.users.push(nickname);
            // Guardar los cambios en el juego
            await game.save();
            // Generar un token JWT para el usuario y devolverlo
            const token = this.createToken(nickname);
            return { token };
        } catch (error) {
            console.log(error);
            return { error: 'Failed to add user' };
        }
    }

    // Agregar un voto a una actividad en un juego por sus IDs
    async addVote(gameId, activityId, vote) {
        try {
            // Obtener el juego por su ID
            const game = await Game.findById(gameId);
            if (!game) {
                return false;
            }
            // Obtener el voto actual para la actividad o establecerlo en cero si no existe
            const currentVote = game.votes.get(activityId) || 0;
            // Calcular el nuevo voto y actualizarlo en el mapa de votos del juego
            game.votes.set(activityId, currentVote + vote);
            // Guardar los cambios en el juego
            await game.save();
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    // Establecer el estado activo/inactivo de un juego por su ID
    async setGameState(id, state) {
        const game = await this.getGameById(id);
        if (game) {
            // Establecer el estado activo/inactivo del juego y, si está activo, establecer la actividad actual
            game.active = state;
            if (state) {
                game.currentActivity = game.proposal.activities[0];
            }
            // Guardar los cambios en el juego
            await game.save();
            return true;
        }
        return false;
    }

    // Obtener las actividades de un juego por su ID
    async getActivities(gameId) {
        // Obtener el juego por su ID
        const game = await this.getGameById(gameId);
        // Obtener la propuesta asociada al juego y luego obtener las actividades de esa propuesta
        const proposal = game.proposal;
        const fetchedProposal = await this.proposalsController.getProposalById(proposal._id);
        return fetchedProposal.activities;
    }

    // Obtener los votos de un juego por su ID
    async getVotes(gameId){
        const game = await this.getGameById(gameId);
        const votes= game.populate('votes').exec();
        return votes;
    }

    // Crear un token JWT para un usuario
    createToken(user) {
        const payload = {
            user_token: user.token
        };
        // Firmar el token con una clave secreta y configurar la expiración
        return jwt.sign(payload, 'token', {
            expiresIn: 60 * 60 * 24
        });
    }
}

module.exports = GamesController;
