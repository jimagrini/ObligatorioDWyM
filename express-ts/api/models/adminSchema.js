const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
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
                type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',
                required: true,
                default: []
            }
        ]
    },
    {
        timestamps: true
    }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;