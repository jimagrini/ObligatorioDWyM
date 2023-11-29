const { Schema, model, Types } = require('mongoose');

const adminSchema = new Schema(
    {
        // Campo para el nombre de usuario del administrador
        username: {
            type: String,
            required: [true, "Debe ingresar un nombre de usuario válido."]
        },
        // Campo para la contraseña del administrador
        password: {
            type: String,
            required: true
        },
        // Campo para las propuestas asociadas al administrador
        proposals: [
            {
                type: Types.ObjectId,  // Tipo de datos: Identificador único de un documento en otra colección
                ref: 'Proposal',      // Referencia a la colección 'Proposal'
                required: true,       // La presencia de al menos una propuesta es obligatoria
                default: []           // Valor predeterminado: una lista vacía al principio
            }
        ]
    },
    {
        timestamps: true  // Agregar marcas de tiempo automáticas (createdAt, updatedAt)
    }
);

// Crear el modelo 'Admin' utilizando el esquema definido
const Admin = model('Admin', adminSchema);

// Exportar el modelo 'Admin' para que pueda ser utilizado en otros archivos
module.exports = Admin;
