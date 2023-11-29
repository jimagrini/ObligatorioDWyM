const { Schema, model, Types } = require('mongoose');

const gameSchema = new Schema(
    {
        // Lista de usuarios participantes en el juego
        users: [
            {
                type: String,
                required: true,
                default: []  // Valor predeterminado: una lista vacía al principio
            }
        ],
        // Propuesta asociada al juego
        proposal:
        {
            type: Types.ObjectId,  // Tipo de datos: Identificador único de un documento en otra colección
            ref: 'Proposal',      // Referencia a la colección 'Proposal'
            required: true         // La presencia de una propuesta es obligatoria
        },
        // Mapa de votos, donde las claves son identificadores de actividades y los valores son la cantidad de votos
        votes:
        {
            type: Map,
            of: Number,
            default: new Map()  // Valor predeterminado: un mapa vacío al principio
        },
        // Actividad actual del juego
        currentActivity:
        {
            type: Types.ObjectId,  // Tipo de datos: Identificador único de un documento en otra colección
            ref: 'Activity',      // Referencia a la colección 'Activity'
            default: null         // Valor predeterminado: null si no hay actividad actual al principio
        },
        // Estado activo/inactivo del juego
        active:
        {
            type: Boolean,
            default: false  // Valor predeterminado: false al principio
        }
    }
);

const Game = model('Game', gameSchema);
module.exports = Game;
