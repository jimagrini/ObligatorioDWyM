const { Schema, model, Types } = require('mongoose');

const proposalSchema = new Schema(
    {
        // Campo para el nombre de la propuesta
        name: {
            type: String,
            required: true  // El nombre de la propuesta es obligatorio
        },
        // Lista de actividades asociadas a la propuesta
        activities: [
            {
                type: Types.ObjectId,  // Tipo de datos: Identificador único de un documento en otra colección
                ref: 'Activity',      // Referencia a la colección 'Activity'
                required: true,        // La presencia de al menos una actividad es obligatoria
                default: []            // Valor predeterminado: una lista vacía al principio
            }
        ]
    }
);

const Proposal = model('Proposal', proposalSchema);
module.exports = Proposal;
