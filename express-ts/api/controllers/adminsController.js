const mongoose = require('mongoose');
const Admin = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminsController {
    constructor() { }

    async getAdmins() {
        return Admin.find().exec();
    }

    async getAdminById(id) {
        return Admin.findById(id).exec();
    }

    async addAdmin(username, password, proposals) {
        const newAdmin = await Admin.create({ username, password, proposals });
        return newAdmin;
    }

    async deleteAdmin(id) {
        const result = await Admin.findByIdAndDelete(id).exec();
        return !!result;
    }

    async login(username, password) {
        try {
            const admin = await Admin.findOne({ username: username });
            if (!admin) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                return null;
            }
            const token = this.createToken(admin);
            return token;
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    }

    createToken(admin) {
        const payload = {
            admin_token: admin.token
        };
        return jwt.sign(payload, 'token');
    }
}

module.exports = AdminsController;
