import express from 'express';
import { adminsController } from '../controllers/adminsController';

const router = express.Router();
const bcrypt = require('bcryptjs');

// Create Admin
router.post('/register', async (req, res) => {
    try {
        const { username, password, proposals } = req.body;
        if (!username || !password) {
            res.status(400)
                .json({ message: 'Missing parameters. Cannot create admin.' });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newAdmin = await adminsController.addAdmin(username, hashedPassword, proposals);
            res.status(201)
                .json(newAdmin);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to create new admin. Error: ${error}` });
    }
});

// Log Admin 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await adminsController.login(username, password);
        if (!token) {
            res.status(401)
                .json({ error: 'Contraseña o usuario incorrecto' });
        } else {
            res.status(200)
                .json({ response: token });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to log admin in. Error: ${error}` });
    }
});

// Get all Admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await adminsController.getAdmins();
        res.status(200)
            .json(admins);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve admins data. Error: ${error}` });
    }
});

// Get Admin by Id
router.get('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await adminsController.getAdminById(id);

        if (!admin) {
            res.status(404)
                .json({ message: `Admin '${id}' not found.` });
        } else {
            res.status(200)
                .json(admin);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to retrieve admin '${id}' data. Error: ${error}` });
    }
});

// Delete Admin by Id
router.delete('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await adminsController.deleteAdmin(id);

        if (!success) {
            res.status(404)
                .json({ success: false, message: `Admin '${id}' not found.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: `Failed to delete admin '${id}'. Error: ${error}` });
    }
});

export default router;