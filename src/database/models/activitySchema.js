const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({

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
        required: true
    },
});

module.exports = mongoose.model('activity', activitySchema);