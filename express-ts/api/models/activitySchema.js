const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            default: ""
        },
        image: {
            type: String,
            required: false
        },
        selected: {
            type: Boolean,
            required: true, 
            default: false
        },
    }
);

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
