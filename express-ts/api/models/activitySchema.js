const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
    {
        // Campo para el nombre de la actividad
        name: {
            type: String,
            required: true
        },
        // Campo para la categoría de la actividad
        category: {
            type: String,
            required: true
        },
        // Campo para la descripción de la actividad
        description: {
            type: String,
            required: true,
            default: ""  // Valor predeterminado: cadena vacía si no se proporciona descripción
        },
        // Campo para la URL de la imagen asociada a la actividad
        image: {
            type: String,
            required: false  // La imagen no es obligatoria
        },
        // Campo booleano que indica si la actividad está seleccionada
        selected: {
            type: Boolean,
            required: true,
            default: false  // Valor predeterminado: false si no se especifica
        }
    }
);

// Crear el modelo 'Activity' utilizando el esquema definido
const Activity = model('Activity', activitySchema);

module.exports = Activity;
