const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    category :  {
        type: String,
        required: true
    },
    description :  {
        type: String,
        required: true
    },
    image :  {
        type: URL,
        required: false
    },
    selected : {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('activity', activitySchema);
