const mongoose = require('mongoose');
const Admin = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AdminsController {

    constructor() { }

    // Obtener todos los administradores
    async getAdmins() {
        // Utilizar el método find() de Mongoose para obtener todos los administradores y ejecutar la consulta
        return Admin.find().exec();
    }

    // Obtener un administrador por su ID
    async getAdminById(id) {
        // Utilizar el método findById() de Mongoose para obtener un administrador por su ID y ejecutar la consulta
        return Admin.findById(id).exec();
    }

    // Agregar un nuevo administrador
    async addAdmin(username, password) {
        // Crear un nuevo administrador utilizando el método create() de Mongoose
        const newAdmin = await Admin.create({ username, password });
        // Devolver el nuevo administrador creado
        return newAdmin;
    }

    // Eliminar un administrador por su ID
    async deleteAdmin(id) {
        // Utilizar el método findByIdAndDelete() de Mongoose para eliminar un administrador por su ID y ejecutar la consulta
        const result = await Admin.findByIdAndDelete(id).exec();
        // Devolver un valor booleano indicando si se eliminó con éxito
        return !!result;
    }

    // Iniciar sesión de un administrador y generar un token JWT
    async login(username, password) {
        try {
            // Buscar un administrador por su nombre de usuario
            const admin = await Admin.findOne({ username: username });
            if (!admin) {
                return null; // Admin no encontrado
            }
            // Comparar la contraseña proporcionada con la almacenada en la base de datos
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return null; // Contraseña incorrecta
            }
            // Generar un token JWT y devolverlo
            const token = this.createToken(admin);
            return token;
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            return null;
        }
    }

    // Método para generar un token JWT
    createToken(admin) {
        const payload = {
            admin_token: admin.token
        };
        // Firmar el token con una clave secreta y configurar la expiración
        return jwt.sign(payload, 'token', {
            expiresIn: 60 * 60 * 24
        });
    }
}

module.exports = AdminsController;
