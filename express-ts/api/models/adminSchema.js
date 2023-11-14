const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    proposals: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',
        required: true
    }]
});

module.exports = mongoose.model('Admin', adminSchema);