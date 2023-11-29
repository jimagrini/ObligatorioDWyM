const Activity = require('../models/activitySchema');

// Controlador para manejar las operaciones relacionadas con las actividades
class ActivitiesController {

    constructor() { }

    // Obtener todas las actividades
    async getActivities() {
        // Utilizar el método find() de Mongoose para obtener todas las actividades y ejecutar la consulta
        return Activity.find().exec();
    }

    // Obtener una actividad por su ID
    async getActivityById(id) {
        // Utilizar el método findById() de Mongoose para obtener una actividad por su ID y ejecutar la consulta
        return Activity.findById(id).exec();
    }

    // Agregar una nueva actividad
    async addActivity(name, category, description, image) {
        // Crear una nueva actividad utilizando el método create() de Mongoose
        const newActivity = await Activity.create({ name, category, description, image, selected: false });
        return newActivity;
    }
}

module.exports = ActivitiesController;
