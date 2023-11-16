const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
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

const Activity = model('Activity', activitySchema);
module.exports = Activity;
