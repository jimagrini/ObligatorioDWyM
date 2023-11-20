const Activity = require('../models/activitySchema');

class ActivitiesController {
    
    constructor() { }

    async getActivities() {
        return Activity.find().exec();
    }

    async getActivityById(id) {
        return Activity.findById(id).exec();
    }

    async addActivity(name, category, description, image) {
        const newActivity = await Activity.create({ name, category, description, image, selected: false });
        
        const activityWithFrontendId = { id: newActivity._id, ...newActivity.toObject() };
        return activityWithFrontendId;
    }
}

module.exports = ActivitiesController;
