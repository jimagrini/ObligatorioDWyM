const express = require('express');
const ProposalsController = require('../controllers/proposalsController');

const router = express.Router();
const proposalsController = new ProposalsController();

// POST - Crear nueva propuesta
router.post('/', validateToken, async (req, res) => {
    try {
        // Extraer los parámetros 'name' y 'activities' de la solicitud
        const { name, activities } = req.body;
        // Verificar si el parámetro necesario 'name' está presente en la solicitud
        if (!name) {
            res.status(400)
                .json({ message: 'Faltan parámetros. No se puede crear la propuesta.' });
        } else {
            // Agregar la propuesta utilizando el controlador de propuestas
            const newProposal = await proposalsController.addProposal(name, activities);
            res.status(201)
                .json(newProposal);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al crear nueva propuesta. Error: ${error}` });
    }
});

// GET - Obtener todas las propuestas
router.get('/', async (req, res) => {
    try {
        // Obtener todas las propuestas utilizando el controlador de propuestas
        const proposals = await proposalsController.getProposals();
        res.status(200)
            .json(proposals);
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de las propuestas. Error: ${error}` });
    }
});

// GET - Obtener propuesta por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Obtener la propuesta por su ID utilizando el controlador de propuestas
        const proposal = await proposalsController.getProposalById(id);
        if (!proposal) {
            res.status(404)
                .json({ message: `Propuesta '${id}' no encontrada.` });
        } else {
            res.status(200)
                .json(proposal);
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al recuperar los datos de la propuesta. Error: ${error}` });
    }
});

// DELETE - Eliminar propuesta por ID (requiere validación de token)
router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar la propuesta por su ID utilizando el controlador de propuestas
        const success = await proposalsController.deleteProposal(id);
        if (!success) {
            res.status(404)
                .json({ success: false, message: `Propuesta '${id}' no encontrada.` });
        } else {
            res.status(204)
                .end();
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Error interno del servidor', details: `Error al eliminar la propuesta '${id}'. Error: ${error}` });
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
