import Activity, { ActivityDocument } from '../models/activitySchema';

class ActivitiesController {

    constructor() { }

    async getActivities(): Promise<ActivityDocument[]> {
        return Activity.find().exec();
    }

    async getActivityById(id: string): Promise<ActivityDocument | null> {
        return Activity.findById(id).exec();
    }

    async addActivity(name: string, category: string, description: string, image: string): Promise<ActivityDocument> {
        const newActivity = await Activity.create({ name, category, description, image, selected: false });
        return newActivity;
    }

    async deleteActivity(id: string): Promise<boolean> {
        const result = await Activity.findByIdAndDelete(id).exec();
        return !!result;
    }
}

/**
 * Singleton instance of ActivitysController.
 */
export const activitiesController: ActivitiesController = new ActivitiesController();
