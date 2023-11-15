import mongoose from 'mongoose';
import Admin, { AdminDocument } from '../models/adminSchema';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminsController {

    constructor() { }

    async getAdmins(): Promise<AdminDocument[]> {
        return Admin.find().exec();
    }

    async getAdminById(id: string): Promise<AdminDocument | null> {
        return Admin.findById(id).exec();
    }

    async addAdmin(username: string, password: string, proposals: mongoose.Types.ObjectId[]): Promise<AdminDocument> {
        const newAdmin = await Admin.create({ username, password, proposals });
        return newAdmin;
    }

    async deleteAdmin(id: string): Promise<boolean> {
        const result = await Admin.findByIdAndDelete(id).exec();
        return !!result;
    }

    async login(username: string, password: string): Promise<string | null> {
        try {
            const admin = await Admin.findOne({ username: username });
            if (!admin) {
                return null; // Admin not found
            }
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                return null; // Incorrect password
            }
            const token = this.createToken(admin);
            return token;
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    }

    private createToken(admin: AdminDocument): string {
        const payload = {
            admin_token: admin.token
        };
        return jwt.sign(payload, 'token');
    }
}

/**
 * Singleton instance of AdminsController.
 */
export const adminsController: AdminsController = new AdminsController();
