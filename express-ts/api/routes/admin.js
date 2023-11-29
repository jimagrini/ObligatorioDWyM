const express = require('express');
const AdminsController = require('../controllers/adminsController');

const router = express.Router();
const adminsController = new AdminsController();
const bcrypt = require('bcryptjs');

// Crear administrador
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Verificar si los parámetros requeridos están presentes en la solicitud
        if (!username || !password) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede crear el administrador.' });
        } else {
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = bcrypt.hashSync(password, 10);
            // Agregar el administrador utilizando el controlador de administradores
            const newAdmin = await adminsController.addAdmin(username, hashedPassword);
            res.status(201)
                .json(newAdmin);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al crear el nuevo administrador. Error: ${error}` });
    }
});

// Iniciar sesión del administrador
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Obtener un token de autenticación utilizando el controlador de administradores
        const token = await adminsController.login(username, password);
        if (!token) {
            res.status(401)
                .json({ error: 'Contraseña o usuario incorrecto' });
        } else {
            res.status(200)
                .json({ auth: true, response: token });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al iniciar sesión del administrador. Error: ${error}` });
    }
});

// Obtener todos los administradores
router.get('/', async (req, res) => {
    try {
        // Obtener todos los administradores utilizando el controlador de administradores
        const admins = await adminsController.getAdmins();
        res.status(200)
            .json(admins);
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de los administradores. Error: ${error}` });
    }
});

// Obtener administrador por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Obtener el administrador por su ID utilizando el controlador de administradores
        const admin = await adminsController.getAdminById(id);

        if (!admin) {
            res.status(404)
                .json({ message: `Administrador '${id}' no encontrado.` });
        } else {
            res.status(200)
                .json(admin);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos del administrador '${id}'. Error: ${error}` });
    }
});

// Eliminar administrador por ID (requiere validación de token)
router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminar el administrador por su ID utilizando el controlador de administradores
        const success = await adminsController.deleteAdmin(id);

        if (!success) {
            res.status(404)
                .json({ success: false, message: `Administrador '${id}' no encontrado.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al eliminar el administrador '${id}'. Error: ${error}` });
    }
});

// Exportar el router para que pueda ser utilizado en otros archivos
module.exports = router;

// Middleware para validar el token en la solicitud
function validateToken(req, res, next) {
    console.log('Validando token...');
    let bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        // Extraer el token de la cabecera "Authorization"
        bearer = bearer.split(' ')[1]
        req.token = bearer;
        console.log('Token validado con éxito')
        next();
    } else {
        // Responder con un código 401 si no se proporciona un token
        res.status(401);
        res.send({ 'no autorizado': 'esta cabecera no tiene un token definido' });
    }
}
