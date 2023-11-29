const express = require('express');
const ActivitiesController = require('../controllers/activitiesController');
const router = express.Router();
const activitiesController = new ActivitiesController();

// POST - Crear actividad
router.post('/', validateToken, async (req, res) => {
    try {
        const { name, category, description, image } = req.body;
        // Verificar si los parámetros requeridos están presentes en la solicitud
        if (!name || !category || !description || !image) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede crear la actividad.' });
        } else {
            // Agregar la actividad utilizando el controlador de actividades
            const newActivity = await activitiesController.addActivity(name, category, description, image);
            res.status(201)
                .json(newActivity);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al crear la nueva actividad. Error: ${error}` });
    }
});

// GET - Obtener todas las actividades
router.get('/', async (req, res) => {
    try {
        // Obtener todas las actividades utilizando el controlador de actividades
        const activities = await activitiesController.getActivities();
        res.status(200)
            .json(activities);
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de las actividades. Error: ${error}` });
    }
});

// GET - Obtener actividad por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Obtener la actividad por su ID utilizando el controlador de actividades
        const activity = await activitiesController.getActivityById(id);
        if (!activity) {
            res.status(404)
                .json({ message: `Actividad '${id}' no encontrada.` });
        } else {
            res.status(200)
                .json(activity);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de la actividad. Error: ${error}` });
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
