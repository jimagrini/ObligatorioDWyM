const { Schema, model, Types } = require('mongoose');

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Debe ingresar un nombre de usuario válido."]
        },
        password: {
            type: String,
            required: true
        },
        proposals: [
            {
                type: Types.ObjectId, 
                ref: 'Proposal',
                required: true,
                default: []
            }
        ]
    },
    {
        timestamps: true
    }
);

const Admin = model('Admin', adminSchema);
module.exports = Admin;
