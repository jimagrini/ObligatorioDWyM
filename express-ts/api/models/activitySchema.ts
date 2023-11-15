import { Schema, Document, model } from 'mongoose';

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

export interface ActivityDocument extends Document {
    name: string;
    category: string;
    description: string;
    image: string;
    selected: boolean;
}

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;
