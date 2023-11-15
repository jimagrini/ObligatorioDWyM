import { Schema, Document, model, Types } from 'mongoose';

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

export interface AdminDocument extends Document {
    username: string;
    password: string;
    proposals: Types.ObjectId[];
    token: string;
}

const Admin = model<AdminDocument>('Admin', adminSchema);
export default Admin;